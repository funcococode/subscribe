"use server"

import { db } from "@/server/db"
import { auth, currentUser } from "@clerk/nextjs/server"

export const getServices = async () => {
    const data = await db.service.findMany({
        select: {
            id: true,
            name: true,
            description: true
        }
    })

    return {message: 'success', status: 200, data}
}

export const getMyServices = async () => {
    auth().protect();
    const user = await currentUser();
    const data = await db.subscription.findMany({
        where: {
            userId: user?.id
        },
        select: {
            service: {
                select : {
                    id: true,
                    name: true,
                    description: true,
                    category: {
                        select: {
                            name: true
                        }
                    },
                    _count: {
                        select: {
                            subscriptions : true
                        }
                    }
                },
            }
        },
        distinct: 'serviceId',
        orderBy: { 
            service: {
                name: "asc"
            }
        }
    })

    return {message: 'success', status: 200, data}
}