"use client"

import { useState } from "react"
import { cn } from "@/utils/cn-utils"
import { Card } from "@/components/ui/card"

export default function DashboardTabs() {
    const [activeTab, setActiveTab] = useState("summary")
    const classes = 'bg-gray-40 border border-2 border-input';
    return (
        <Card className="flex space-x-4 px-4 p-2">
            <button
                onClick={() => setActiveTab("summary")}
                className={cn(
                    "px-6 py-2 rounded-full text-sm text-gray-900/1 font-medium transition-colors",
                    activeTab === "summary"
                        ? `${classes} border-indigo-600`
                        : `${classes} border-gray-40`,
                )}
            >
                Summary
            </button>
            <button
                onClick={() => setActiveTab("details")}
                className={cn(
                    "px-6 py-2 rounded-full text-sm text-gray-900/1 font-medium transition-colors flex items-center",
                    activeTab === "details"
                        ? `${classes} border-indigo-600`
                        : `${classes} border-gray-40`,
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
                Details
            </button>
        </Card>
    )
}
