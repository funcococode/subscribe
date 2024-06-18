'use client'
import { updateSubscriptionStatus } from "@/actions/subscriptions";
import { queryClient } from "@/app/layout";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { StatusTypes, UpdateStatusProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { TbCurrencyRupee, TbLoader2 } from "react-icons/tb";
import { toast } from "sonner";

interface Props{
    data : DataProps | undefined; 
    subscriptionId: string;
}

interface DataProps{
    id: string | undefined;
    cycle: string | undefined;
    amount: number;
    service: string | undefined;
    service_link: string | undefined;
    description: string;
    status: string | undefined;
    start_date: string;
    next_billing: string;
    created_date: Date | undefined;
}

const GeneralSubscriptionSettings = ({data, subscriptionId} : Props) => {
    const {mutateAsync, isPending} = useMutation({mutationKey: ['update-subscription'], mutationFn: (payload: UpdateStatusProps) => updateSubscriptionStatus(payload)}) 

    const handleChange = async (value: StatusTypes) => {
        if(subscriptionId){
            const payload = {
                id: subscriptionId,
                status: value
            }
            const response = await mutateAsync(payload);
            if(response?.data?.id){
                await queryClient.refetchQueries({queryKey: ['subscriptions']});
                await queryClient.invalidateQueries({queryKey: [`subscription-status-${subscriptionId}`]})
                toast.success('Subscription Status Changed')
            }
        }
    }
    return ( <>
        <div className="border p-4 rounded-lg space-y-3">
            <div className='flex items-center justify-between'>
                <h1 className='text-gray-700 font-medium text-xs'>Status</h1>
                <Select 
                    defaultValue={data?.status} 
                    onValueChange={handleChange} 
                    disabled={isPending}
                >
                    <SelectTrigger className={`w-max ${isPending && 'animate-pulse'} flex items-center gap-2 transition-all h-6 text-xs`}>
                        <SelectValue placeholder="Status"/>
                        {isPending && <span className='animate-spin'>
                            <TbLoader2 />
                        </span>}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* <div className='flex flex-col gap-2'>
                <h1 className='text-gray-700 text-xs flex-1'>Description</h1>
                <Input value={data?.description} />
            </div> */}
        </div>
    </> );
}
 
export default GeneralSubscriptionSettings;