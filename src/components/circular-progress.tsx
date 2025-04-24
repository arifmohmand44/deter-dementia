interface CircularProgressProps {
    percentage: number
    size?: number
    strokeWidth?: number
    color?: string
    bgColor?: string
}

export default function CircularProgress({
    percentage = 18,
    size = 200,
    strokeWidth = 16,
    color = "#3730a3", // Indigo-700 color that matches the image
    bgColor = "#f1f1f4", // Light gray background color
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const dash = (percentage * circumference) / 100

    return (
        <div className="flex items-center justify-center p-4">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                    {/* Background circle */}
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />

                    {/* Progress arc */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - dash}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold" style={{ color }}>
                        {percentage}%
                    </span>
                </div>
            </div>
        </div>
    )
}

