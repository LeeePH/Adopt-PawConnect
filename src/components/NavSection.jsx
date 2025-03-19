"use client"

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun, faArrowDown } from "@fortawesome/free-solid-svg-icons"

const NavSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [username, setUsername] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    const urlParams = new URLSearchParams(window.location.search)
    const user = urlParams.get("username")
    if (user) {
      setUsername(user)
      localStorage.setItem("username", user)
    } else {
      const savedUsername = localStorage.getItem("username")
      if (savedUsername) {
        setUsername(savedUsername)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    window.location.href = "http://localhost:5173"
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50 duration-300">
      <nav className="container mx-auto flex flex-wrap justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#6D712E" }}>
            PawConnect
          </h1>
        </div>

        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 duration-300">
            Home
          </a>
          <a href="#pet" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 duration-300">
            Our Animals
          </a>
          <a href="#guide" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 duration-300">
            News
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 duration-300">
            FAQs
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300 duration-300">
            Support Us
          </a>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="user-dropdown relative">
            <h2 className="text-gray-700 dark:text-white">
              Hello,{" "}
              <button onClick={toggleDropdown} className="focus:outline-none" style={{ color: "#6D712E" }}>
                {username || "User"} <FontAwesomeIcon icon={faArrowDown} className="ml-1" />
              </button>
            </h2>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-md shadow-lg z-50">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                    View Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Settings</li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} className="text-xl" style={{ color: "#6D712E" }} />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default NavSection
