"use client"

import { useEffect, useState } from "react"

export default function Loader({ className = "" }: { className?: string }) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 30) % 360)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative h-10 w-10 ${className}`}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 30 + rotation) % 360
        const transformStyle = { transform: `rotate(${angle}deg) translateY(-300%)` } // Increased from -120% to -150%

        // Calculate opacity based on position
        // The first dot is the darkest, and they get progressively lighter
        const opacity = 0.3 + (i * 0.09);
        const size = 8 + i; // First dot is largest, decreasing in size

        return (
          <div key={i} className="absolute left-1/2 top-1/2 h-3 w-3" style={transformStyle}>
            <div
              className="rounded-full bg-indigo-500"
              style={{
                opacity: opacity,
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}