'use client'
import { Switch } from "@/components/ui/switch"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { TbCalendarEvent, TbCalendarExclamation } from "react-icons/tb";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSubscriptionReminderStatusBySubscriptionId, updateSubscriptionReminderBySubscriptionId } from "@/actions/reminder";
import type { EmailReminderNotificationTypes, UpdateEmailNotificationReminderProps } from "@/types";
import { queryClient } from "@/app/layout";

interface Props{
    subscriptionId: string;
    reminders: {
        id: string;
        status: boolean;
        reminderDate: Date | null;
        reminderType: EmailReminderNotificationTypes;
    }[] | undefined
}

const EmailNotificationSettings = ({subscriptionId, reminders} : Props) => {
    const upcomingReminderId = reminders?.filter(item => item?.reminderType === 'upcoming')?.[0]?.id;
    const overdueReminderId = reminders?.filter(item => item?.reminderType === 'overdue')?.[0]?.id;

    const { mutateAsync, isPending, isError } = useMutation({mutationKey: ['update-upcoming-payment-reminder'], mutationFn: (payload: UpdateEmailNotificationReminderProps) => updateSubscriptionReminderBySubscriptionId(payload)})
    const { data, isFetching } = useQuery({queryKey: ['subscription-reminder-status', subscriptionId], queryFn: () => getSubscriptionReminderStatusBySubscriptionId(subscriptionId)})

    if(isError){
        toast.error('Uh Oh!', {
            description: 'It seems the problem is on our end, we are trying to solve the issue.'
        })
    }

    const handleUpcomingPaymentReminder = async (isChecked: boolean, reminderType: EmailReminderNotificationTypes) => {
        const payload = {
            id : (reminderType === 'overdue' ? overdueReminderId : upcomingReminderId) ?? '',
            status: isChecked,
            reminderType,
            subscriptionId
        } satisfies UpdateEmailNotificationReminderProps;

        const response = await mutateAsync(payload);
        if(response?.data?.id){
            const message = isChecked ? 'We will remind you before your next payment! Thanks' : 'Email notifications paused for this subscription'
            await queryClient?.invalidateQueries({queryKey: ['subscription-reminder-status']});
            toast.success(message);
        }else{ 
            toast.error('Unable to set payment reminder at the moment.')
        }
    }

    return ( <div className='space-y-3'>
        <Card className="border-none shadow-none">
            <CardContent className="grid p-0">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <span className='text-xl'><TbCalendarEvent /></span>
                    <div className="flex-1 space-y-1">
                        <p className="text-xs font-medium leading-none">
                            Upcoming Payment Reminder
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Send payment reminder notification before 5 days 
                        </p>
                    </div>
                    <Switch checked={data?.data?.upcoming} onCheckedChange={isChecked => handleUpcomingPaymentReminder(isChecked, 'upcoming')} disabled={isPending || isFetching} />
                </div>
            </CardContent>
        </Card>
        <Card className="border-none shadow-none">
            <CardContent className="grid p-0">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <span className='text-xl'><TbCalendarExclamation /></span>
                    <div className="flex-1 space-y-1">
                        <p className="text-xs font-medium leading-none">
                            Overdue Reminder
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Send overdue notification if subscription status is not Active or Cancelled
                        </p>
                    </div>
                    <Switch checked={data?.data?.overdue} onCheckedChange={isChecked => handleUpcomingPaymentReminder(isChecked, 'overdue')} disabled={isPending || isFetching}/>
                </div>
            </CardContent>
        </Card>

    </div> );
}
 
export default EmailNotificationSettings;