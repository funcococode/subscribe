'use client'
import { getSpendsByCategory } from "@/actions/analytics";
import { useQuery } from "@tanstack/react-query";
import RenderPieChart from "../charts/pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TbChartPie3, TbLoader3 } from "react-icons/tb";
import { DatePicker } from "../date-picker";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { startOfMonth } from "date-fns";

const CategorySpendsPieChart = ({}) => {
    const [date, setDate] = useState<DateRange>({
        from: startOfMonth(new Date()),
        to: new Date(),
    });
    
    const getData = async () => {
        const response = await getSpendsByCategory(date);
        return response?.data;
    }

    const {data, isFetching} = useQuery({queryKey: ['category-spend-analysis'], queryFn: getData, refetchOnWindowFocus: true}); 
    
    return ( <>
        <Card className={`shadow-none h-full flex flex-col justify-between relative`}>
            <div className='h-full'>
                <CardHeader className=''>
                    <CardTitle className="flex gap-2 items-center justify-between">
                        <div className="flex gap-2 items-center font-medium text-sm">
                            <span className={`bg-amber-600/10 text-amber-600 p-2 rounded-full text-xl`}>
                                <TbChartPie3 />
                            </span>
                            <p className="flex flex-col gap-1">
                                <span>
                                    Spend Analysis
                                </span>
                                {/* <span className="text-xs text-gray-400">
                                    Spend breakdown according to different categories
                                </span> */}
                            </p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <DatePicker handler={setDate}/>
                            {/* <TbInfoCircle className='text-gray-300 cursor-pointer hover:text-gray-700' /> */}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid place-items-center">
                    {isFetching && <TbLoader3 className="animate-spin"/>}
                    {data && !isFetching && <RenderPieChart data={data?.map(item => ({name: item.name, value: item.cost}))} key="name"/>}
                </CardContent>
            </div>
        </Card>
    </> );
}
 
export default CategorySpendsPieChart;