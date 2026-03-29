import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { Pie, PieChart } from "recharts"
import { Progress } from "@/components/ui/progress"
import * as React from "react";


const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const DashboardPage = () => {
   const [progress, setProgress] = React.useState(13);

   React.useEffect(()=>{
    const timer = setTimeout(()=>setProgress(66),5000)
    return () => clearTimeout(timer)
},[])



    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>남은 예산</CardTitle>
                        <CardDescription>2월달 남은 금액</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress 
                        value={progress}  
                        className="h-4 w-full bg-slate-100" 
                        indicatorClassName={progress < 30 ? "bg-red-500" : "bg-green-500"}
                        />
                        <div className="flex justify-between text-sm font-medium">
                            <span className={progress < 30 ? "text-red-500" : "text-slate-500"}>
                                {progress < 30 ? "위험!" : "안정적"}
                            </span>
                            <span>{progress}%</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>저축 목표</CardTitle>
                        <CardDescription>목표 금액 1,000,000원</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Progress value={66} // 임시 값
                        className="h-4 w-full bg-slate-100" 
                        indicatorClassName="bg-blue-500"/>
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-blue-600 font-bold">66% 달성</span>
                                <span className="text-slate-400 text-xs">D-12</span>
                            </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>남은 예산</CardTitle>
                        <CardDescription>2월달 남은 금액</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              stroke="0"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPage;