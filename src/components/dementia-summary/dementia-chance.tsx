"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import HalfCircularProgress from "@/components/half-circular-progress"
interface DementiaRiskProps {
  percentage?: number
  text?: string
}
export default function DementiaRisk({
  percentage = 0,
  text = "Dementia Chances At 60 Years"
}: DementiaRiskProps) {
  return (
    <Card className="h-full flex flex-col items-center justify-center">
      <CardContent className="p-6 flex flex-col items-center justify-center h-full">
        <HalfCircularProgress percentage={percentage} size={160} />
      </CardContent>
      <CardFooter>
        <h3 className="text-md font-medium text-center text-gray-900/1">{text}</h3>
      </CardFooter>
    </Card>
  )
}

