"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import HalfCircularProgress from "@/components/half-circular-progress"
interface DementiaRiskProps {
  percentage?: number
  text?: string
}
export default function DementiaRisk({
  percentage = 0,
  text
}: DementiaRiskProps) {
  return (
    <Card className="h-full flex flex-col items-center justify-center">
      <CardContent className="p-6 flex flex-col items-center justify-center h-full">
        <HalfCircularProgress percentage={percentage} size={160} />
      </CardContent>
      <CardFooter>
        {percentage > 0 ?
          (
            <h3 className="text-md font-medium text-center text-gray-900/1">{text}</h3>
          ) : (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
          )}

      </CardFooter>
    </Card>
  )
}

