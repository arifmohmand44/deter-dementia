"use client"

import { useEffect, useState } from "react"

interface CircularProgressProps {
    percentage?: number
    size?: number
    strokeWidth?: number
    strokeColor?: string
    color?: string
}

export default function HalfCircularProgress({
    percentage = 0,
    size = 200,
    strokeWidth = 16,
    strokeColor = "#E9EDF0",
    color = "#31338D",
}: CircularProgressProps) {
    // Pre-calculate constants to ensure consistency
    const radius = Math.floor((size - strokeWidth) / 2)
    const circumference = Math.floor(radius * Math.PI * 1.6)
    const startX = Math.floor(size / 2 + radius * Math.cos(Math.PI * 0.25))
    const startY = Math.floor(size / 2 - radius * Math.sin(Math.PI * 0.25))
    const endX = Math.floor(size / 2 + radius * Math.cos(Math.PI * 1.75))
    const endY = Math.floor(size / 2 - radius * Math.sin(Math.PI * 1.75))

    const pathD = `M ${startX} ${startY} A ${radius} ${radius} 0 1 0 ${endX} ${endY}`

    const [progress, setProgress] = useState(0)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const timer = setTimeout(() => {
            setProgress(percentage)
        }, 100)
        return () => clearTimeout(timer)
    }, [percentage])

    const strokeDashoffset = Math.floor(circumference + (progress / 100) * circumference)

    return (
        <div className="relative inline-flex items-center justify-center bg-gray-40 rounded-full p-4">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ transform: "rotate(90deg)" }}
            >
                <path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                <path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={isClient ? { transition: "stroke-dashoffset 0.5s ease-in-out" } : undefined}
                />
            </svg>
            <div
                className="absolute inset-0 flex items-center justify-center"
            >
                <span className="text-4xl font-bold" style={{ color }}>
                    {Math.floor(progress)}%
                </span>
            </div>
        </div>
    )
}
