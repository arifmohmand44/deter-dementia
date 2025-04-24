"use client"
import { useState, useEffect } from "react"
import DashboardTabs from "@/components/dementia-summary/dashboard-tabs"
import DementiaChance from "@/components/dementia-summary/dementia-chance"
// import Profile from "@/components/dementia-summary/profile"
import RiskChart from "@/components/dementia-summary/risk-chart"

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
          { age_group: "60-65", probability: "0%" },
          { age_group: "65-70", probability: "0%" },
          { age_group: "70-75", probability: "0%" },
          { age_group: "75-80", probability: "0%" },
          { age_group: "80-85", probability: "0%" },
          { age_group: "85-90", probability: "0%" },
          { age_group: "90+", probability: "0%" }
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
          {chartData && <RiskChart chartData={chartData} />}
        </div>
      </div>

      {/* <div className="mt-3">
        <RiskChart chartData={chartData} />
      </div> */}
    </div>
  )
}