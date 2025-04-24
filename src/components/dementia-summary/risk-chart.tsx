"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RiskChart({ chartData }: { chartData: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; index: number } | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [ageRanges, setAgeRanges] = useState<string[]>([])
  const [riskValues, setRiskValues] = useState<number[]>([])
  const [isValidData, setIsValidData] = useState(false)

  useEffect(() => {
    if (!chartData?.chartData?.future_projection) {
      console.error('Invalid chart data structure:', chartData);
      setIsValidData(false);
      return;
    }

    const ranges = chartData.chartData.future_projection.map((item: any) => item.age_group);
    const values = chartData.chartData.future_projection.map((item: any) => 
      Number(item.probability.replace(/%/g, ""))
    );
    
    setAgeRanges(ranges);
    setRiskValues(values);
    setIsValidData(true);

    // Add debug logging for processed data
    console.log('Processed chart data:', { ranges, values });
  }, [chartData]);

  useEffect(() => {
    if (!isValidData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for sharper rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Reset canvas styles
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Initial draw
    drawChart(ctx, rect, dpr);

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const padding = 20;
      const chartWidth = rect.width - padding * 2;
      const nearestPoint = getNearestPoint(x, y, rect, padding, chartWidth);
      setHoveredPoint(nearestPoint);
      setIsHovering(true);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', () => setIsHovering(false));

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', () => setIsHovering(false));
    };
  }, [isValidData, ageRanges, riskValues]);

  if (!isValidData) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>No chart data available</p>
        </CardContent>
      </Card>
    );
  }

  const getDefaultPoint = (rect: DOMRect, padding: number, chartWidth: number) => {
    // Find the first non-zero value point
    const defaultIndex = riskValues.findIndex((value: number) => value > 22);
    if (defaultIndex === -1) return null;

    const pointX = padding + defaultIndex * (chartWidth / (ageRanges.length - 1));
    const pointY = padding + (rect.height - padding * 2) - (riskValues[defaultIndex] / 70) * (rect.height - padding * 2);
    return { x: pointX, y: pointY, value: riskValues[defaultIndex], index: defaultIndex };
  };

  const getNearestPoint = (x: number, y: number, rect: DOMRect, padding: number, chartWidth: number) => {
    let nearestPoint = null;
    let minDistance = Infinity;

    riskValues.forEach((value: number, i: number) => {
      // Skip zero values
      if (value === 0) return;

      const pointX = padding + i * (chartWidth / (ageRanges.length - 1));
      const pointY = padding + (rect.height - padding * 2) - (value / 70) * (rect.height - padding * 2);

      // Calculate distance to this point
      const distance = Math.sqrt(Math.pow(x - pointX, 2) + Math.pow(y - pointY, 2));

      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = { x: pointX, y: pointY, value, index: i };
      }
    });

    return nearestPoint;
  };

  const drawChart = (ctx: CanvasRenderingContext2D, rect: DOMRect, dpr: number) => {
    // Clear the canvas
    ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr);

    // Chart dimensions
    const padding = 20;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"; // Gray-200
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 7; i++) {
      const y = padding + (chartHeight - i * (chartHeight / 7));
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= ageRanges.length - 1; i++) {
      const x = padding + i * (chartWidth / (ageRanges.length - 1));
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + chartHeight);
      ctx.stroke();
    }

    // Draw x-axis labels
    ctx.fillStyle = "#6b7280"; // Gray-500
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";

    ageRanges.forEach((range: string, i: number) => {
      const x = padding + i * (chartWidth / (ageRanges.length - 1));
      ctx.fillText(range, x, padding + chartHeight + 15);
    });

    // Draw y-axis labels
    ctx.textAlign = "right";
    for (let i = 0; i <= 7; i++) {
      const value = i * 10;
      const y = padding + chartHeight - i * (chartHeight / 7);
      ctx.fillText(value.toString(), padding - 10, y + 3);
    }

    // Draw area under the line
    ctx.beginPath();
    ctx.moveTo(padding, padding + chartHeight);
    riskValues.forEach((value: number, i: number) => {
      const x = padding + i * (chartWidth / (ageRanges.length - 1));
      const y = padding + chartHeight - (value / 70) * chartHeight;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.closePath();

    // Create gradient for area
    const areaGradient = ctx.createLinearGradient(0, padding + chartHeight, 0, padding);
    areaGradient.addColorStop(0, "rgba(67, 56, 202, 0.02)"); // Very light indigo at bottom
    areaGradient.addColorStop(1, "rgba(67, 56, 202, 0.1)"); // Slightly darker indigo at top
    ctx.fillStyle = areaGradient;
    ctx.fill();

    // Draw the line chart with gradient
    const lineGradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    lineGradient.addColorStop(0, "#4f46e5"); // Indigo-600
    lineGradient.addColorStop(1, "#31338D"); // Indigo-700
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 2;
    ctx.beginPath();

    riskValues.forEach((value: number, i: number) => {
      const x = padding + i * (chartWidth / (ageRanges.length - 1));
      const y = padding + chartHeight - (value / 70) * chartHeight;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw data points only for non-zero values
    riskValues.forEach((value: number, i: number) => {
      if (value === 0) return; // Skip zero values

      const x = padding + i * (chartWidth / (ageRanges.length - 1));
      const y = padding + chartHeight - (value / 70) * chartHeight;

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#31338D";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw tooltip
    const activePoint = isHovering ? hoveredPoint : getDefaultPoint(rect, padding, chartWidth);
    if (activePoint && activePoint.value > 0) {
      const tooltipWidth = 80;
      const tooltipHeight = 50;

      // Calculate tooltip position based on point location
      let tooltipX = activePoint.x - tooltipWidth / 2;
      let tooltipY = activePoint.y - tooltipHeight - 20;

      // Adjust position for last point
      if (activePoint.index === ageRanges.length - 1) {
        tooltipX = activePoint.x - tooltipWidth - 15;
        tooltipY = activePoint.y - tooltipHeight / 2;
      }

      // Ensure tooltip stays within chart bounds
      tooltipX = Math.max(padding, Math.min(padding + chartWidth - tooltipWidth, tooltipX));

      // Draw tooltip background with rounded corners
      ctx.fillStyle = "#31338D"; // Indigo-950
      ctx.beginPath();
      ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);
      ctx.fill();

      // Draw tooltip border
      ctx.strokeStyle = "#31338D"; // Indigo-700
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw pointer arrow
      ctx.beginPath();
      if (activePoint.index === ageRanges.length - 1) {
        // Arrow pointing right for last point
        ctx.moveTo(tooltipX + tooltipWidth, tooltipY + tooltipHeight / 2 - 8);
        ctx.lineTo(tooltipX + tooltipWidth + 8, tooltipY + tooltipHeight / 2);
        ctx.lineTo(tooltipX + tooltipWidth, tooltipY + tooltipHeight / 2 + 8);
      } else {
        // Center arrow for middle points
        ctx.moveTo(activePoint.x - 8, tooltipY + tooltipHeight);
        ctx.lineTo(activePoint.x, tooltipY + tooltipHeight + 8);
        ctx.lineTo(activePoint.x + 8, tooltipY + tooltipHeight);
      }
      ctx.fill();
      ctx.stroke();

      // Draw tooltip content
      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";

      // Draw age range
      ctx.fillText(ageRanges[activePoint.index], tooltipX + tooltipWidth / 2, tooltipY + 20);

      // Draw risk percentage
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(`${activePoint.value}%`, tooltipX + tooltipWidth / 2, tooltipY + 40);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Risk Of Dementia By Years</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ touchAction: 'none' }}
          />
        </div>
      </CardContent>
    </Card>
  );
}