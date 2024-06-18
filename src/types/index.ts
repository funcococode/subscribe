import { type Decimal } from "@prisma/client/runtime/library";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export type Subscription = {
    id: string;
    cycle: string;
    amount: Decimal;
    service: string;
    service_link: string;
    description: string;
    status: string;
    start_date: string;
    next_billing: string;
    created_date: Date
}

export interface AddSubscriptionForm{
    service: string;
    description: string;
    purchase_date: Date;
    amount: string;
    billing_cycle: string;
}

export interface UpdateStatusProps{
    id: string;
    status: StatusTypes
}

export interface UpdateEmailNotificationReminderProps{
    id: string;
    status: boolean;
    reminderType: EmailReminderNotificationTypes;
    subscriptionId: string;
}

export type StatusTypes = "Active" | "Cancelled" | "Pending" | "Overdue"
export type BillingCycleTypes = "onetime" | "weekly" | "monthly" | "yearly"
export type EmailReminderNotificationTypes = "overdue" | "upcoming"

export type RefetchType = (options?: RefetchOptions) => Promise<QueryObserverResult<Subscription[] | undefined, Error>>
