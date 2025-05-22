"use client"

import { useState, useEffect } from "react"

export function useMobileDetection() {
  // Default to non-mobile to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if the screen width is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Clean up event listener
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
