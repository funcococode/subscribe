"use server"

import { EmailTemplate } from '@/components/email/email-template';
import { db } from '@/server/db';
import { Resend } from 'resend';
import { clerkClient } from '@clerk/nextjs/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async () => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['funcococode@gmail.com'],
            subject: 'Hello world',
            text: "",
            react: EmailTemplate({ 
                firstName: 'Rachit' 
            }),
        });
    
        if (error) {
            return {message: 'error', status: 500, data: error}
        }
    
        return {message: 'success', status: 200, data: data}

      } catch (error) {
        return {message: 'error', status: 500, data: error}
      }
}

export const getActiveSubscriptionsForEmailNotification = async () => {   
    try{
        const response = await db.reminder.findMany({
            where: {
                status: true
            },
            select: {
                subscriptionId: true,
                reminderDate: true,
                id: true,
                subscription: {
                    select: {
                        service: {
                            select: {
                                name: true,
                            }
                        },
                        description: true,
                        cost: true,
                        userId: true,
                        startDate: true,
                        reminderDaysBefore: true
                    }
                }
            }
        });

        const subscriptions = response?.map(async user => {
            const userDetails = await clerkClient.users.getUser(user?.subscription?.userId);
            const userEmail = userDetails?.primaryEmailAddress;
            let returnPayload = {};
            if(userEmail){
                returnPayload = {
                    email : userEmail,
                    firstname : userDetails?.firstName,
                    reminderDate : user?.reminderDate,
                    subscriptionName : user?.subscription?.service?.name,
                    subscriptionDescription: user?.subscription?.description,
                    amount : user?.subscription?.cost,
                    subscriptionStartDate: user?.subscription?.startDate,
                    reminderBefore: user?.subscription?.reminderDaysBefore
                }
            }
            
            return returnPayload;
        });

        if(subscriptions?.length){
            return {message: 'success', status: 200, data: subscriptions}
        }
            
        return {message: 'success', status: 200, data: []}
    }catch(error){
        return {message: 'error', status: 500, data: error}
    }
}