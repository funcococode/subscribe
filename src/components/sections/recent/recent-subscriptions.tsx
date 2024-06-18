import { getRecentSubscriptions } from "@/actions/subscriptions";
import { useQuery } from "@tanstack/react-query";
import { TbCurrencyRupee, TbInfoCircle, TbNumber1, TbRepeat } from "react-icons/tb";
import { TbCalendarPlus } from "react-icons/tb";
import { formatDistance } from "date-fns";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";
import BrandLogo from "../table/brand-logo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const RecentSubscriptions = () => {
    
    const fetchData = async () => {
        const response = await getRecentSubscriptions();
        return response?.data
    };

    const {data, isPending} = useQuery({queryKey: ['recent-subscription'], queryFn: fetchData});

    return ( <div>
        <Card className={`shadow-none h-full flex flex-col justify-between `}>
            <div className='h-full flex flex-col'>
                <CardHeader className=''>
                    <CardTitle className="flex gap-2 items-center justify-between">
                        <div className="flex gap-2 items-center font-medium text-sm">
                            <span className={`bg-amber-600/10 text-amber-600 p-2 rounded-full text-xl`}>
                                <TbCalendarPlus />
                            </span>
                            Recent Subscriptions
                        </div>
                        <div className='flex items-center gap-2'>
                            <Link href='#' className="text-xs text-purple-600 font-medium">View All</Link>
                            <TbInfoCircle className='text-gray-300 cursor-pointer hover:text-gray-700' />
                        </div>
                    </CardTitle>
                </CardHeader>
                <ScrollArea className="w-full flex-1 flex-nowrap relative flex">
                    <CardContent className="flex gap-3 w-max pr-24">
                        {data?.length === 0 && <span className="text-xs text-gray-600 col-span-4 grid place-content-center">No recent subscriptions</span>}
                        {data?.map(item => <li className="w-1/2 flex flex-col border border-purple-100 items-start justify-evenly gap-8 list-none p-3 rounded-lg bg-gray-50/20 text-sm" key={item?.id}>
                            <h1 className='rounded px-2 py-0.5 text-xs flex items-center gap-2 w-full'>
                                {item?.cycle === "onetime" ? <TbNumber1 /> : <TbRepeat />}
                                {item?.cycle}
                            </h1>
                            <div className="flex items-center gap-3">
                                <span className='bg-purple-100 rounded p-2 text-4xl'>
                                    <BrandLogo brandname={item?.service} />
                                </span>
                                <span className='font-semibold text-purple-800 flex flex-col gap-1'>
                                    {item?.service}
                                    <span className="text-gray-600 text-xs font-light">
                                        {item?.description}
                                    </span>
                                </span>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <span className='flex items-center gap-1 text-gray-800  font-bold'>
                                    <TbCurrencyRupee />
                                    {Number(item?.amount)}
                                </span>
                                <span className='text-xs text-gray-400'>
                                    {formatDistance(item?.start_date, new Date(), {addSuffix: true})}
                                </span>
                            </div>
                        </li>)}
                    </CardContent>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-gray-50"></div>
                    <ScrollBar orientation="horizontal" className=""/>
                </ScrollArea>
            </div>
        </Card>
    </div> );
}
 
export default RecentSubscriptions;