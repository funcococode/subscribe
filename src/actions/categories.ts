"use server"

import { db } from "@/server/db"

export const getCategories = async () => {
    const data = await db.category.findMany({
        select: {
            id: true,
            name: true,
            description: true
        }
    })

    return {message: 'success', status: 200, data}
}

export const getCategoryById = async (id: string) => {
    const data = await db.category.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            description: true
        }
    })

    return {message: 'success', status: 200, data}
}