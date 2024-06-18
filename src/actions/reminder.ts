"use server"

import { getNextPaymentDate } from "@/lib/utils";
import { db } from "@/server/db";
import type { BillingCycleTypes, UpdateEmailNotificationReminderProps} from "@/types";
import { auth } from "@clerk/nextjs/server";

export const getSubscriptionReminderStatusBySubscriptionId = async (subscriptionId : string) => {
    try{
        auth().protect();

        const data = await db?.reminder?.findMany({
            where: {
                subscriptionId : subscriptionId
            },
            select: {
                reminderType: true,
                status: true
            }
        });

        const payload : {
            upcoming : boolean;
            overdue : boolean
        } = {
            upcoming: false,
            overdue : false
        };


        data?.forEach(item => {
            payload[item?.reminderType] = item?.status
        })

        if(data){
            return {message: 'success', status: 200, data: payload }
        }
    }catch(err){
        throw err;
    }
}

export const updateSubscriptionReminderBySubscriptionId = async ({id, subscriptionId,  status, reminderType} : UpdateEmailNotificationReminderProps) => {
    try{
        auth().protect();

        const existingSubscription = await db?.subscription?.findFirst({
            where: {
                id : subscriptionId
            },
            select: {
                startDate: true,
                billingCycle: true,
            }
        });

        const existingReminder = await db.reminder.findFirst({
            where : {
                subscriptionId : subscriptionId,
                reminderType: reminderType
            },
            select : {
                id: true
            }
        });
        
        const {startDate, billingCycle} = existingSubscription!;
        
        const nextPaymentDate = getNextPaymentDate(startDate, billingCycle satisfies BillingCycleTypes);

        

        let data;
        if(existingReminder?.id){
            data = await db.reminder.update({
                where: {
                    id: existingReminder?.id
                },

                data: {
                    status,
                    reminderDate: nextPaymentDate,
                    reminderType : reminderType
                },

                select: {
                    id: true
                }
            });
        }else{
            data = await db.reminder.create({
                data: {
                    status,
                    reminderDate: nextPaymentDate,
                    reminderType : reminderType,
                    subscriptionId
                },
                select: {
                    id: true
                }
            });
        }


        if(data){
            return {message: 'success', status: 200, data }
        }
    }catch(err){
        throw err;
    }
}