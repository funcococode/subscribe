"use server"

import { db } from "@/server/db";
import type { BillingCycleTypes, UpdateStatusProps } from "@/types";
import { currentUser, auth } from "@clerk/nextjs/server";
import {addMonths, addWeeks, addYears, format, subDays} from 'date-fns'

interface AddProps{
    service: string;
    purchase_date: Date;
    amount: string;
    billing_cycle: BillingCycleTypes;
    description? : string;
} 

export const addSubscription = async ({amount, service, billing_cycle, purchase_date,description = ''}: AddProps) => {
    try{
        const user = await currentUser();
        
        if(!user) return {message: "No logged in user found", status: 400};
        
        let nextPaymentDate : Date | null = addMonths(purchase_date,1);
        
        if(billing_cycle === 'yearly'){
            nextPaymentDate = addYears(purchase_date,1)
        }else if(billing_cycle === 'weekly'){
            nextPaymentDate = addWeeks(purchase_date,1)
        }else {
            nextPaymentDate = null
        }
        
        const category = await db?.service?.findUnique({
            where: {
                id : service
            },
            select: {
                categoryId: true
            }
        })

        const data = await db.subscription.create({
            data: {
                billingCycle: billing_cycle,
                cost: amount,
                description,
                nextBillingDate: nextPaymentDate ?? null,
                startDate: purchase_date,
                reminderDaysBefore:5,
                status:'Active',
                userId: user?.id,
                serviceId: service,
                categoryId: category?.categoryId ?? '',
                reminders: {
                    create : {
                        reminderDate : nextPaymentDate ? subDays(nextPaymentDate, 5) : null,
                    }
                }
            },
        });
        
        if(data){
            return {message: 'success', status: 200, data }
        }
    }catch(err){
        throw err;
    }
}   

export const deleteSubscription = async (id: string) => {
    try{
        auth().protect()

        const data = await db.subscription.delete({
            where: {
                id: id
            },
            select: {
                id: true
            },
        });

        if(data){
            return {message: 'success', status: 200, data }
        }
    }catch(err){
        throw err;
    }
}

export const updateSubscriptionStatus = async ({id, status} : UpdateStatusProps) => {
    try{
        auth().protect();
        const data = await db.subscription.update({
            where: {
                id: id
            },
            data: {
                status
            },
            select: {
                id: true
            }
        });

        if(data){
            return {message: 'success', status: 200, data }
        }
    }catch(err){
        throw err;
    }
}


export const getSubscriptionStatusById = async (id: string) => {
    try{
        auth().protect();

        const data = await db.subscription.findFirst({
            where: {
                id: id
            },
            select: {
                status: true
            }
        });

        if(data){
            return {message: 'success', status: 200, data }
        }
    }catch(err){
        throw err;
    }
}

export const getSubscriptions = async () => {
    try{
        const user = await currentUser();
        if(!user) return {message: "No logged in user found", status: 400};
        const data = await db.subscription.findMany({
            where: {
                userId: user?.id
            },
            select: {
                id: true,
                billingCycle: true,
                cost: true,
                description: true,
                service: {
                    select: {
                        name: true,
                        link: true
                    }
                },
                status: true,
                startDate: true,
                nextBillingDate: true,
                createdAt: true
            },
            orderBy: {
                startDate: "desc"
            }
        });

        const payload = data?.map(item => ({
            id: item?.id,
            cycle: item?.billingCycle,
            amount: item?.cost,
            service: item?.service?.name,
            service_link: item?.service?.link,
            description: item?.description ?? '',
            status: item?.status,
            start_date: format(item?.startDate, 'PP'),
            next_billing: item?.nextBillingDate ? format(item?.nextBillingDate, 'PP') : '-',
            created_date: item?.createdAt
        }));

        if(payload){
            return {message: 'success', status: 200, data: payload }
        }
    }catch(err){
        throw err;
    }
}   

export const getSubscriptionById = async (id: string) => {
    try{
        auth().protect();

        const data = await db.subscription.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                billingCycle: true,
                cost: true,
                description: true,
                service: {
                    select: {
                        name: true,
                        link: true
                    }
                },
                reminders: {
                    select :{
                        id: true,
                        status: true,
                        reminderDate: true,
                        reminderType: true
                    }
                },
                status: true,
                startDate: true,
                nextBillingDate: true,
                createdAt: true
            },
        });

        const payload = {
            id: data?.id,
            cycle: data?.billingCycle,
            amount: Number(data?.cost),
            service: data?.service?.name,
            service_link: data?.service?.link,
            description: data?.description ?? '',
            status: data?.status,
            start_date: data?.startDate ? format(data?.startDate, 'PP') : '',
            next_billing: data?.nextBillingDate ? format(data?.nextBillingDate, 'PP') : '-',
            created_date: data?.createdAt,
            reminders: data?.reminders
        };

        if(payload){
            return {message: 'success', status: 200, data: payload }
        }
    }catch(err){
        throw err;
    }
}   

export const getRecentSubscriptions = async () => {
    try{
        const user = await currentUser();
        if(!user) return {message: "No logged in user found", status: 400};
        const data = await db.subscription.findMany({
            where: {
                userId: user?.id,
                startDate: {
                    gt: subDays(new Date(), 7),
                    lte: new Date()
                }
            },
            select: {
                id: true,
                billingCycle: true,
                cost: true,
                description: true,
                service: {
                    select: {
                        name: true,
                        link: true
                    }
                },
                status: true,
                startDate: true,
                nextBillingDate: true,
                createdAt: true
            },
            orderBy: {
                startDate: "desc"
            }
        });

        const payload = data?.map(item => ({
            id: item?.id,
            cycle: item?.billingCycle,
            amount: item?.cost,
            service: item?.service?.name,
            service_link: item?.service?.link,
            description: item?.description ?? '',
            status: item?.status,
            start_date: format(item?.startDate, 'PP'),
            next_billing: item?.nextBillingDate ? format(item?.nextBillingDate, 'PP') : '-',
            created_date: item?.createdAt
        }));

        if(payload){
            return {message: 'success', status: 200, data: payload }
        }
    }catch(err){
        throw err;
    }
}   