"use client"
import { TbInfoCircle } from "react-icons/tb";
import { TbCalendarPlus } from "react-icons/tb";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMyServices } from "@/actions/services";
import ServiceCard from "./service-card";


interface Props{

};

const MyServices = ({} : Props) => {
    const fetchData = async () => {
        const response = await getMyServices();
        return response?.data;
    }
    const {data, isFetching} = useQuery({queryKey: ['my-services'], queryFn: fetchData});
    return ( <div>
        <Card className={`shadow-none h-full flex flex-col justify-between`}>
            <div className='h-full'>
                <CardHeader className=''>
                    <CardTitle className="flex gap-2 items-center justify-between">
                        <div className="flex gap-2 items-center font-medium text-sm">
                            <span className={`bg-amber-600/10 text-amber-600 p-2 rounded-full text-xl`}>
                                <TbCalendarPlus />
                            </span>
                            My Services
                        </div>
                        <div className='flex items-center gap-2'>
                            <Link href='#' className="text-xs text-purple-600 font-medium">View All</Link>
                            <TbInfoCircle className='text-gray-300 cursor-pointer hover:text-gray-700' />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-3">
                    {isFetching ? "Fetching data..." : data?.map(item => <ServiceCard 
                        name={item?.service?.name} 
                        key={item?.service?.id} 
                        description={item?.service?.description} 
                        category={item?.service?.category?.name} 
                        count={item?.service?._count.subscriptions} 
                    />)}
                </CardContent>
            </div>
        </Card>
    </div> );
}
 
export default MyServices;