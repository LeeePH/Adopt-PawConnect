"use client"
import { Heart } from "lucide-react"
import { useState } from "react"
import logo from "../assets/logo-modified.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons"

const PetCards = ({ pet, onMoreInfoClick }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const openLoginModal = () => {
    setShowRegisterModal(false)
    setShowLoginModal(true)
  }

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal)
    if (showRegisterModal) setShowRegisterModal(false)
  }

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal)
    if (showLoginModal) setShowLoginModal(false)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = document.querySelector("#login-username")?.value
    const password = document.querySelector("#login-password")?.value

    if (!username || !password) {
      alert("Please fill in both fields.")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        alert(`Login failed: ${errorText}`)
      } else {
        const data = await response.json()
        alert("Login successful!")
        console.log(data.token)

        window.location.href = "https://adopt-pet-adoption-4.netlify.app/"
      }
    } catch (error) {
      alert("Error connecting to the server.")
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault() // Prevent form submission
    const username = document.querySelector("#register-username").value
    const email = document.querySelector("#register-email").value
    const password = document.querySelector("#register-password").value

    if (!username || !email || !password) {
      alert("Please fill in all fields.")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        alert(`Registration failed: ${errorText}`)
      } else {
        alert("Registration successful!")
        openLoginModal() // Switch to login modal after successful registration
      }
    } catch (error) {
      alert("Error connecting to the server.")
    }
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group">
      <div className="relative">
        {pet.img ? (
          <div className="relative overflow-hidden">
            <img
              src={`http://localhost:5000${pet.img}`}
              alt={pet.name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No Image Available
          </div>
        )}

        {/* Pet badge/tag */}
        <div className="absolute top-3 right-3">
          <span className="bg-[#6D712E]/90 text-white text-xs font-bold px-2 py-1 rounded-full">{pet.size}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{pet.name}</h2>
          <Heart
            className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
            onClick={openLoginModal} // Fixed: Call the function instead of passing the state
          />
        </div>

        <div className="flex items-center mb-3">
          <div className="w-2 h-2 rounded-full bg-[#6D712E] mr-2"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{pet.location}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-2 text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 block">Gender</span>
            <span className="font-medium text-gray-800 dark:text-white">{pet.gender}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-2 text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 block">Age</span>
            <span className="font-medium text-gray-800 dark:text-white">{pet.age || "Unknown"}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4 h-10">{pet.description}</p>

        <button
          className="w-full bg-[#6D712E] text-[#6D712E] py-2.5 rounded-md transition-all duration-300 hover:bg-[#44471a] hover:text-white font-medium flex items-center justify-center"
          onClick={() => onMoreInfoClick(pet)}
        >
          <span className="text-white">More Info</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PetCards

