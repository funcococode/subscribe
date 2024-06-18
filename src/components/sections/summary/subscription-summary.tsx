import { TbCalendarRepeat, TbListCheck, TbBell, TbInfoCircle, TbCurrencyRupee, TbCalendarTime } from "react-icons/tb";
import SummaryCard from "./summary-card";
import {isWithinInterval, addDays, isBefore,formatDistance, isThisMonth } from 'date-fns'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";
import type { Subscription } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area"
import BrandLogo from "../table/brand-logo";


const SubscriptionSummary = ({data}: {data: Subscription[]}) => {
    const today = new Date();
    const endDate = addDays(today, 7); // Adding one week to today's date
    
    const totalCount = data?.length;
    const activeCount = data?.filter(item => item.status === 'Active').length
    const overdue = data?.filter(item => isBefore(item?.next_billing, new Date())).length
    const upcoming = data?.filter(item => isWithinInterval(item?.next_billing, { start: today, end: endDate }))
    let totalPayments = 0

    data?.forEach(item => {
        if(isThisMonth(item?.start_date)) {
            totalPayments += Number(item?.amount)
        }
    })

    return ( <div className='grid grid-cols-2 grid-rows-2 gap-5 h-[350px]'>
        <div className='grid grid-cols-2 row-span-2 gap-5'>
            <SummaryCard title="Total Subscriptions" color='purple' value={totalCount} icon={<TbListCheck />} />
            <SummaryCard title="Active Subscriptions" color='emerald' value={activeCount} icon={<TbCalendarRepeat /> } />
            <SummaryCard title="Overdue" color='rose' value={overdue} icon={<TbCalendarTime />} />
            <SummaryCard title="Total Spends" color='sky' value={totalPayments} icon={<TbCurrencyRupee />} />
        </div>
        <div className="row-span-2">
            <Card className={`shadow-none h-full flex flex-col justify-between`}>
                <div className='h-full grid grid-rows-12'>
                    <CardHeader className='row-span-3'>
                        <CardTitle className="flex gap-2 items-center justify-between">
                            <div className="flex gap-2 items-center font-medium text-sm">
                                <span className={`bg-amber-600/10 text-amber-600 p-2 rounded-full text-xl`}>
                                    <TbBell />
                                </span>
                                Upcoming Payments
                            </div>
                            <div className='flex items-center gap-2'>
                                <Link href='#' className="text-xs text-purple-600 font-medium">View All</Link>
                                <TbInfoCircle className='text-gray-300 cursor-pointer hover:text-gray-700' />
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="row-span-9">
                        <ScrollArea className="h-full">
                            {upcoming?.length === 0 && <span className="text-xs text-gray-600 grid place-content-center">No upcoming payments</span>}
                            {upcoming?.map(item => <li className="flex border border-purple-100 items-center justify-between gap-2 list-none mb-2 p-3 rounded-lg bg-gray-50/20 text-sm" key={item?.id}>
                                <div className='flex gap-2 items-start'>
                                    <span className='bg-purple-100  rounded p-1 text-md'>
                                        <BrandLogo brandname={item?.service} />
                                    </span>
                                    <span className='font-semibold text-purple-800 flex flex-col gap-1'>
                                        {item?.service}
                                        <span className="text-gray-600 text-xs font-light">
                                            {item?.description}
                                        </span>
                                    </span>
                                </div>
                                <span className='text-xs text-gray-400'>
                                    {formatDistance(item?.next_billing, new Date(), {addSuffix: true})}
                                </span>
                            </li>)}
                        </ScrollArea>
                    </CardContent>
                </div>
            </Card>
        </div>
    </div> );
}
 
export default SubscriptionSummary;