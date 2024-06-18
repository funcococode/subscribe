"use server"

import { db } from "@/server/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import { startOfMonth, startOfYear, format } from "date-fns";
import type { DateRange } from "react-day-picker";

export const getSpendsByCategory = async ({from, to}: DateRange) => {
    auth().protect();
    const user = await currentUser();

    const categoryData = await db.subscription.groupBy({
        by: ['categoryId'],
        _sum: {
            cost: true
        },
        where: {
            userId: user?.id,
            startDate: {
                gte : from ?? startOfMonth(new Date()),
                lte: to ?? new Date()
            },
        },
    });

    const keys = categoryData?.map(item => item.categoryId);
    const names = await db.category.findMany({
        where: {
            id: {
                in : keys
            }
        },
        select: {
            id: true,
            name: true
        }
    });

    const data : {
        id: string;
        name: string;
        cost: number;
    }[] = [];
    
    names?.forEach((item, idx) => {
        data.push({...item, cost: Number(categoryData[idx]?._sum?.cost)});
    })


    return {message: 'success', status: 200, data}
}

export const getSpendsByMonths = async () => {
    auth().protect();
    const user = await currentUser();

    const response = await db.subscription.groupBy({
        by: ['startDate'],
        _sum: {
            cost: true
        },
        where: {
            userId: user?.id,
            startDate: {
                gte : startOfYear(new Date()),
                lte: new Date()
            },
        },
    });

    const data = response?.map(item => ({
        name: format(item?.startDate, 'dd-MM-yyyy'), 
        value: Number(item?._sum?.cost)
    }))

    return {message: 'success', status: 200, data}
}