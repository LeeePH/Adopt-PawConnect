"use client"

import { useState } from "react"
import { scroller } from "react-scroll"
import "../common/main-section.css"

export default function MainSection() {
  const [isAdoptFormOpen, setAdoptFormOpen] = useState(false)

  const scrollToFAQ = () => {
    scroller.scrollTo("faqSection", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    })
  }

  const handleAdoptClick = () => {
    setAdoptFormOpen(true)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-background"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#6D712E]/20 dark:bg-[#6D712E]/40 text-[#cdd18c] dark:text-[#B5B874] px-4 py-2 rounded-full text-base font-medium mx-auto">
            <span className="text-white">Find your perfect companion</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Adopt A Shelter <br />
            <span className="text-[#6D712E]">Cat or Dog</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Our adoptable cats and dogs are spayed/neutered and vaccinated thanks to our shelters. Since they've had a
            tough life before being rescued, we want to make sure they go to loving homes where they'll be safe and
            cared for.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-6 justify-center">
            <button
              onClick={handleAdoptClick}
              className="bg-[#6D712E] hover:bg-[#84893C] text-white h-14 px-10 rounded-lg text-xl font-medium transition-colors"
            >
              Adopt Now
            </button>

            <button
              onClick={scrollToFAQ}
              className="border-2 border-[#6D712E] text-[#9b9f5b] hover:bg-[#6D712E]/10 h-14 px-10 rounded-lg text-xl font-medium transition-colors"
            >
              View FAQs
            </button>
          </div>

          <div className="animate-bounce mt-16 text-white/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <p className="text-sm mt-2">Scroll to learn more</p>
          </div>
        </div>
      </div>
    </div>
  )
}
