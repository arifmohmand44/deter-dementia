"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts"; // Import the correct type

const Chart = dynamic(() => import("react-apexcharts"), { 
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-[300px] bg-gray-50">
            <div className="animate-pulse flex space-x-4">
                <div className="h-48 w-full bg-gray-200 rounded"></div>
            </div>
        </div>
    )
});

export default function DementiaRiskChart() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const chartOptions: ApexOptions = {
        chart: {
            type: "line",
            height: "100%",
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        series: [
            {
                name: '',
                data: [10, 20, 30, 36, 42, 48, 50, 55], // Sample values
            },
        ],
        xaxis: {
            categories: ["60-65", "65-70", "70-75", "75-80", "80-85", "85-90", "90-95", "95-100"],
        },
        stroke: {
            curve: "straight",
            width: 2
        },
        markers: {
            size: 5,
            colors: ["#ffffff"],
            strokeColors: "#31338D",
            strokeWidth: 2,
            hover: { size: 6 },
        },
        tooltip: {
            enabled: true,
            theme: 'light',
            style: {
                fontSize: '12px',
                fontFamily: 'inherit'
            },
            x: {
                show: false
            },
            y: {
                formatter: (val: number) => `${val}%`,
            },
            marker: {
                show: false,
            },
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                return `<div class="custom-tooltip" data-tooltip="${series[seriesIndex][dataPointIndex]}%">${series[seriesIndex][dataPointIndex]}%</div>`
            }
        },
        fill: {
            type: "line",
            colors: ["#31338D"],
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100],
            },
        }
    };

    if (!mounted) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Dementia Risk Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] bg-gray-50" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Dementia Risk Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <Chart
                    options={chartOptions}
                    series={chartOptions.series}
                    type="line"
                    height={300}
                />
            </CardContent>
        </Card>
    );
}
