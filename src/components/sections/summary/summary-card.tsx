import { type ReactElement } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TbInfoCircle } from "react-icons/tb";
import RenderLineChart from "@/components/charts/line-chart";
  
interface Props{
    title: string;
    value: number;
    icon?: ReactElement
    color?: string
}
const SummaryCard = ({title, value, icon, color} : Props) => {
    return ( <>
        <Card className={`shadow-none h-full flex flex-col`}>
            <CardHeader>
                <CardTitle className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center text-sm font-medium">
                        <span className={`bg-${color}-600/10 text-${color}-600 p-2 rounded-full text-xl`}>
                            {icon ? icon : ''}
                        </span>
                        {title}
                    </div>

                    <TbInfoCircle className='text-gray-300 cursor-pointer hover:text-gray-700' />
                </CardTitle>
            </CardHeader>
            <CardContent className='flex-1 border-t bg-gray-50/20 flex items-end justify-between'>
                {/* <RenderLineChart /> */}
                <p className='text-2xl text-right font-semibold'>
                    {/* <NumberTicker value={value} /> */}
                    {value}
                </p>
            </CardContent>
        </Card>

    </> );
}
 
export default SummaryCard;