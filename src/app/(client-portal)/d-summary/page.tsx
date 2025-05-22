"use client"
import { useState, useEffect } from "react"
import DashboardTabs from "@/components/dementia-summary/dashboard-tabs"
import DementiaChance from "@/components/dementia-summary/dementia-chance"
// import Profile from "@/components/dementia-summary/profile"
import RiskChart from "@/components/dementia-summary/risk-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const [questions, setQuestions] = useState<any>({});
  const [percentage, setPercentage] = useState<number>(0);
  const [chartData, setChartData] = useState<any>(null);

  // Example using useEffect for initial data fetching
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch('/api/summary');
        const summary = await response.json();
        setPercentage(Number(summary?.data?.results?.current_probability?.replace(/%/g, "")) || 0);
        setQuestions(summary?.data?.questions || {});

        // Prepare chart data
        const defaultProjection = [
          {
            age: "65",
            probability: "41.19%"
          },
          {
            age: "70",
            probability: "44.86%"
          },
          {
            age: "75",
            probability: "48.52%"
          },
          {
            age: "80",
            probability: "52.19%"
          },
          {
            age: "85",
            probability: "55.86%"
          },
          {
            age: "90",
            probability: "59.52%"
          },
          {
            age: "95",
            probability: "63.19%"
          }
        ];

        const chartDataStructure = {
          chartData: {
            future_projection: summary?.data?.results?.future_projection || defaultProjection
          }
        };

        setChartData(chartDataStructure);
        // Use the session data as needed
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl py-3 sm:py-3">
      <DashboardTabs />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
        <div className="md:col-span-1">
          <DementiaChance percentage={percentage} text={`Dementia Chances At ${questions?.Age || 'current'} Years`} />
        </div>
        <div className="md:col-span-3">
          {/* <Profile profileData={profileData} /> */}
          {chartData ?
            (
              <RiskChart chartData={chartData} />
            ) : (
              <Card>
                <div className="h-full w-full flex flex-col animate-pulse">
                  {/* Chart Title Skeleton */}
                  <CardHeader>
                    <CardTitle>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="py-5 w-full h-[300px]">
                      {/* Y-Axis Skeleton */}
                      <div className="flex space-x-4 h-full">
                        <div className="flex flex-col justify-between h-full w-8">
                          {[...Array(11)].map((_, i) => (
                            <div key={`y-axis-${i}`} className="h-3 bg-gray-200 rounded w-full"></div>
                          ))}
                        </div>

                        {/* Chart Area Skeleton */}
                        <div className="flex-1 relative">
                          {/* Grid Lines */}
                          <div className="absolute inset-0 flex flex-col justify-between">
                            {[...Array(11)].map((_, i) => (
                              <div key={`grid-line-${i}`} className="h-px bg-gray-100 w-full"></div>
                            ))}
                          </div>

                          {/* Area Chart Simulation */}
                          <div className="absolute bottom-0 left-0 right-0 h-[85%]">
                            <div className="relative h-full w-full">
                              <div className="absolute bottom-0 left-0 right-0 h-full bg-gray-200 opacity-30 rounded-t"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gray-300 opacity-50 rounded-t"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gray-400 opacity-70 rounded-t"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* X-Axis Skeleton */}
                      <div className="flex justify-between mt-2">
                        {[...Array(12)].map((_, i) => (
                          <div key={`x-axis-${i}`} className="h-3 bg-gray-200 rounded w-10"></div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )}
        </div>
      </div>

      {/* <div className="mt-3">
        <RiskChart chartData={chartData} />
      </div> */}
    </div>
  )
}