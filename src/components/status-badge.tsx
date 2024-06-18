'use client';

import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionStatusById } from "@/actions/subscriptions";
import { Skeleton } from "./ui/skeleton";

const StatusBadge = ({status = '', id = ''}: {id?: string, status?: string}) => {
    const [value, setValue] = useState(status);
    const {data, isFetching} = useQuery({queryKey: [`subscription-status-${id}`, id], queryFn: () => getSubscriptionStatusById(id)})

    useEffect(() => {
      if(data?.data?.status){
        setValue(data?.data?.status);
      }
    },[data])

    let colors = '';
    if(value === 'Active'){
      colors = 'bg-emerald-600 bg-opacity-10 text-emerald-600'
    }
    else if(value === 'Canceled' || value === 'Cancelled'){
      colors = 'bg-gray-600 bg-opacity-10 text-gray-600'
    }
    else if(value === 'Pending'){
      colors = 'bg-amber-600 bg-opacity-10 text-amber-600'
    }
    else if(value === 'Overdue'){
      colors = 'bg-rose-600 bg-opacity-10 text-rose-600'
    }
    return isFetching ? <Skeleton className='w-16 h-5 rounded-xl' /> : <Badge className={`${colors} rounded-xl px-3.5 py-0.5 text-xs shadow-none font-normal`}>{value}</Badge>
}
 
export default StatusBadge;