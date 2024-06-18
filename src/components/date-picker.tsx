"use client"

import { Dispatch, SetStateAction, useState } from "react" 
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, startOfMonth } from "date-fns"

import { cn, getDateRangeStartEndByKeyword } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { DateRange } from "react-day-picker"
import { queryClient } from "@/app/layout"

export function DatePicker({handler}: {handler: Dispatch<SetStateAction<DateRange>>}) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: startOfMonth(new Date()),
        to: new Date(),
    })
    const [value,setValue] = useState('mtd');

    const handleDateRangeChange = async (keyword: string) => {
        setDate(getDateRangeStartEndByKeyword(keyword))
        handler(getDateRangeStartEndByKeyword(keyword))
        await queryClient.invalidateQueries({queryKey: ['category-spend-analysis']});
        setValue(keyword)
    }

    return (
        <Popover>
        <PopoverTrigger asChild>
            <Button
            variant={"outline"}
            className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
            )}
            >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
                date.to ? (
                    <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                    </>
                ) : (
                    format(date.from, "LLL dd, y")
                )
                ) : (
                <span>Pick a date</span>
                )}
            </Button>
        </PopoverTrigger>
        <PopoverContent
            align="end"
            className="flex w-auto flex-col space-y-2 p-2"
        >
            <Select
                onValueChange={handleDateRangeChange}
                defaultValue={value}
            >
            <SelectTrigger>
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="l7d">Last 7 days</SelectItem>
                <SelectItem value="l15d">Last 15 days</SelectItem>
                <SelectItem value="l30d">Last 30 days</SelectItem>
                <SelectItem value="lm">Last Month</SelectItem>
                <SelectItem value="mtd">This Month to date</SelectItem>
                <SelectItem value="ytd">This Year to date</SelectItem>
            </SelectContent>
            </Select>
            <div className="rounded-md border">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    classNames={{
                        day: 'h-6 w-6 text-xs font-medium',
                        head_cell: 'h-6 w-6 text-xs font-normal',
                        caption_label: "text-xs font-medium",
                        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-xs',
                        day_range_start: "day-range-start rounded-l ",
                        day_range_end: "day-range-end rounded-r ",
                    }}
                />
            </div>
        </PopoverContent>
        </Popover>
    )
}
