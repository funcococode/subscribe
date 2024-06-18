'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Modal } from "./modal";
import { getSubscriptionById } from "@/actions/subscriptions";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import BrandLogo from "@/components/sections/table/brand-logo";
import StatusBadge from "@/components/status-badge";


import DeleteSubscription from "@/components/delete-subscription";
import EmailNotificationSettings from "@/components/sections/edit/email-notification-settings";
import GeneralSubscriptionSettings from "@/components/sections/edit/general-subscription-settings";
import { TbBell, TbCalendar, TbCircleFilled, TbCurrencyRupee, TbRepeat, TbSettings2 } from "react-icons/tb";
  

interface Props{
    params: {
        id: string;
    }
}

const Page = ({params}: Props) => {
    const subscriptionId = params?.id;
    const fetchData = async () => {
        if(subscriptionId){
            const response = await getSubscriptionById(subscriptionId);
            return response?.data;
        }
    }

    const {data, isFetching} = useQuery({queryKey: ['subscription-by-id-data'], queryFn: fetchData}) ;


    return ( <Modal>
        <div className='space-y-10'>
            <Alert className="flex items-center gap-5">
                {isFetching ? <Skeleton className='w-12 h-12 rounded-lg' /> : <div className='bg-purple-500/10 rounded-lg p-3 text-xl'>
                    <BrandLogo brandname={data?.service ?? ''} />
                </div>}
                <div className='flex items-center justify-between flex-1'>
                    <div>
                        <AlertTitle className='font-bold'>{isFetching ? <Skeleton className='w-36 h-3' /> : data?.service}</AlertTitle>
                        <AlertDescription className="text-xs space-y-2.5">
                            <div>
                                {isFetching ? <Skeleton className='w-44 h-3' /> : data?.description}
                            </div>
                            <div className='flex items-center gap-2 text-gray-500/80 text-[11px]'>
                                
                                <span className="text-rose-600 flex items-center gap-1">
                                    <TbCurrencyRupee className="text-sm"/>
                                    {isFetching ? <Skeleton className='w-12 h-3' /> : data?.amount}
                                </span>
                                <TbCircleFilled className='w-2 h-2 text-gray-300' />
                                <span className="hover:text-rose-600 flex items-center gap-1">
                                    <TbCalendar className="text-sm"/>
                                    {isFetching ? <Skeleton className='w-12 h-3' /> : data?.start_date}
                                </span>
                                <TbCircleFilled className='w-2 h-2 text-gray-300' />
                                <span className="uppercase flex items-center gap-1 hover:text-rose-600">
                                    <TbRepeat className="text-sm"/>
                                    {isFetching ? <Skeleton className='w-20 h-3' /> : data?.cycle}
                                </span>
                            </div>
                        </AlertDescription>
                    </div>
                    <StatusBadge id={subscriptionId} />
                </div>
            </Alert>

            <div className="space-y-4">
                <div className='flex items-center gap-2'>
                    <span className={`bg-indigo-600/10 text-indigo-600 p-2 rounded-full text-xl`}>
                        <TbSettings2 />
                    </span>
                    <h1 className="">General</h1>
                </div>
                <GeneralSubscriptionSettings subscriptionId={subscriptionId} data={data} />
            </div>

            <div className="space-y-4">
                <div className='flex items-center gap-2'>
                    <span className={`bg-indigo-600/10 text-indigo-600 p-2 rounded-full text-xl`}>
                        <TbBell />
                    </span>
                    <h1 className="">Email Notifications</h1>
                </div>
                <EmailNotificationSettings subscriptionId={subscriptionId} reminders={data?.reminders} />
            </div>

            
            <div className='flex justify-end'>
                <DeleteSubscription subscriptionId={subscriptionId ?? ''} />
            </div>
        </div>

    </Modal> );
}
 
export default Page;