"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApexOptions } from "apexcharts"

// ✅ Dynamically import Chart with SSR turned off
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function RiskChart({ chartData }: { chartData: any }) {
  const [series, setSeries] = useState<ApexAxisChartSeries>([{
    name: 'Risk Percentage',
    data: []
  }])
  const [categories, setCategories] = useState<string[]>([])
  const [isValidData, setIsValidData] = useState(false)

  useEffect(() => {
    if (!chartData?.chartData?.future_projection) {
      console.error('Invalid chart data structure:', chartData)
      setIsValidData(false)
      return
    }

    // Process and format the data
    const projectionData = chartData.chartData.future_projection
    const ranges = projectionData.map((item: any) => {
      const ages = item.age_group.split('-').map(Number)
      return `${ages[0]}-${ages[1]}`
    })

    const values = projectionData.map((item: any) =>
      Number(item.probability.replace(/%/g, ""))
    ) // ✅ Fixed: closing parenthesis was missing

    setCategories(ranges)
    setSeries([{
      name: 'Risk Percentage',
      data: values
    }])
    setIsValidData(true)
  }, [chartData])

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations: {
        enabled: true,
        speed: 800
      }
    },
    colors: ['#4f46e5'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    markers: {
      size: 5,
      colors: ['#fff'],
      strokeColors: ['#4f46e5'],
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 10,
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px'
        },
        formatter: (val: number) => `${val}%`
      }
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${val}%`
      }
    }
  }

  if (!isValidData) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>No chart data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900/1">Risk Of Dementia By Years</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          {categories.length > 0 && series[0].data.length > 0 ? (
            <Chart
              options={options}
              series={series}
              type="area"
              height="100%"
              width="100%"
            />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
