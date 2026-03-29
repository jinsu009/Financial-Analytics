// src/components/layout/Calender.tsx
import * as React from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react"; 
import { Button } from "@/components/ui/button";

// Props 타입 정의
interface CalenderProps {
  selectedDate: Date; // 사용자가 탭에서 선택한 연월 정보
  onAddClick: (day: Date) => void;
}

const Calender: React.FC<CalenderProps> = ({ selectedDate, onAddClick }) => {
  // 달력을 그리기 위한 날짜 계산
  const monthStart = startOfMonth(selectedDate); // 해당 월의 1일
  const monthEnd = endOfMonth(monthStart); // 해당 월의 마지막 날
  const startDate = startOfWeek(monthStart); // 1일이 포함된 주의 일요일
  const endDate = endOfWeek(monthEnd); // 마지막 날이 포함된 주의 토요일

  // 달력에 표시할 모든 날짜 배열 생성
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <Card className="shadow-none border-none bg-transparent">
      <CardContent className="p-0">
        {/* 요일 표시 헤더 */}
        <div className="grid grid-cols-7 gap-px border-b border-slate-200 bg-slate-50/50 text-center text-xs font-semibold text-slate-500 py-3">
          {weekDays.map((day) => (
            <div key={day} className={cn(day === "일" && "text-red-500", day === "토" && "text-blue-500")}>
                {day}
            </div>
          ))}
        </div>

        {/* 달력 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-px bg-slate-100">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={cn(
                "relative bg-white p-3 h-32 hover:bg-slate-50 cursor-pointer transition",
    "group", 
    !isSameMonth(day, monthStart) && "text-slate-400 bg-slate-50/50",
              )}
            >
                <div className="flex justify-between items-center mb-2">
              {/* 날짜 숫자 */}
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium",
                    isSameDay(day, new Date()) ? "bg-primary text-white" : "text-slate-700",
                    !isSameMonth(day, monthStart) && "text-slate-300"
                )}
              >
                {format(day, "d")}
              </time>

              <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-primary"
                  onClick={() => onAddClick(day)} // 부모에게 클릭한 날짜 전달
                >
                  <Plus className="h-4 w-4" />
                </Button>
            </div>
              
          {/* 💡 수입/지출 표시 영역 */}
              <div className="space-y-1">
                {/* 실제 데이터 연동 전 예시 레이아웃 */}
                <div className="text-[11px] font-semibold text-blue-600 px-1">
                  + 50,000원
                </div>
                <div className="text-[11px] font-semibold text-red-600 px-1">
                  - 12,500원
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calender;