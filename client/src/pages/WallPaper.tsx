// src/components/layout/WallPaper.tsx
import * as React from "react";
import { format, setYear, setMonth, addYears, subYears } from "date-fns";
import Calender from "./Calender";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const WallPaper = () => {
  // 현재 날짜를 기준으로 초기 상태 설정
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [targetDate, setTargetDate] = React.useState<Date | null>(null);
  // 연도 선택 옵션 생성 (현재 기준 앞뒤 5년)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // 연도 변경 핸들러
  const handleYearChange = (year: string) => {
    const newDate = setYear(selectedDate, parseInt(year));
    setSelectedDate(newDate);
  };

  // 월 변경 핸들러 (Tabs는 문자열 값을 사용하므로 숫자로 변환 필요)
  const handleMonthChange = (monthIndex: string) => {
    const newDate = setMonth(selectedDate, parseInt(monthIndex));
    setSelectedDate(newDate);
  };

  const handleAddClick = (day: Date) => {
    setTargetDate(day);
    setIsDialogOpen(true);
  };

  const months = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  return (
    <>
    <Card className="shadow-none border-none bg-transparent">
        <CardHeader className="px-6 py-8 flex flex-row items-center justify-between space-y-0 bg-white/50 rounded-t-xl border-b border-slate-100 mb-6">
            <div>
            <CardTitle className="text-2xl font-bold">월간 지출 달력</CardTitle>
            <CardDescription>
                {format(selectedDate, "yyyy년 MM월")}의 지출 내역입니다.
            </CardDescription>
            </div>
            
            {/* 💡 연도 선택 Selectbox */}
            <Select defaultValue={currentYear.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[120px] bg-white">
                <SelectValue placeholder="연도 선택" />
            </SelectTrigger>
            <SelectContent>
                {yearOptions.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                    {year}년
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
            <div className="px-6">
                <Tabs 
                defaultValue={selectedDate.getMonth().toString()} 
                onValueChange={handleMonthChange}
                className="w-full bg-white p-1 rounded-lg border border-slate-200"
                >
                <TabsList className="grid w-full grid-cols-12 bg-transparent gap-1">
                    {months.map((month, index) => (
                    <TabsTrigger 
                        key={month} 
                        value={index.toString()} // 0부터 11까지의 인덱스를 값으로 사용
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs h-9"
                    >
                        {month}
                    </TabsTrigger>
                    ))}
                </TabsList>
                </Tabs>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <Calender selectedDate={selectedDate} onAddClick={handleAddClick} />
            </div>
          </div>
        </CardContent>
      </Card>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="p-6 bg-slate-50 border-b">
            <DialogTitle className="text-xl font-bold text-slate-800">
              {targetDate && format(targetDate, "yyyy년 MM월 dd일")}
            </DialogTitle>
            <p className="text-sm text-slate-500">새로운 내역을 기록합니다.</p>
          </DialogHeader>

          <div className="p-8 space-y-6">
            {/* 수입/지출 선택 (Radio) */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700">구분</Label>
              <RadioGroup defaultValue="expense" className="flex gap-4">
                <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition w-full">
                  <RadioGroupItem value="income" id="income" className="text-blue-600" />
                  <Label htmlFor="income" className="font-medium text-blue-600 cursor-pointer">수입</Label>
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition w-full">
                  <RadioGroupItem value="expense" id="expense" className="text-red-600" />
                  <Label htmlFor="expense" className="font-medium text-red-600 cursor-pointer">지출</Label>
                </div>
              </RadioGroup>
            </div>

            {/* 금액 입력 */}
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-sm font-semibold text-slate-700">금액</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  className="pl-4 pr-12 h-12 text-lg font-semibold border-slate-200 focus:ring-primary"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">원</span>
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 pt-0 flex gap-2">
            <Button 
              variant="outline" 
              className="w-full h-11 font-semibold border-slate-200"
              onClick={() => setIsDialogOpen(false)}
            >
              닫기
            </Button>
            <Button 
              className="w-full h-11 font-semibold bg-primary"
              onClick={() => {
                // 여기에 저장 로직 추가
                setIsDialogOpen(false);
              }}
            >
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  </>
  );
};

export default WallPaper;