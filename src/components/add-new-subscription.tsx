import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { TbPlus, TbX } from 'react-icons/tb'
import SubscriptionForm from "./subscription-form";
import { useState } from "react";
import type { RefetchType } from "@/types";

interface Props{
    refetch: RefetchType
}

const AddNewSubscription = ({refetch}: Props) => {
    const [modalOpen, setModalOpen] = useState(false)
    return ( <>
        <Dialog open={modalOpen}>
            <DialogTrigger asChild onClick={() => setModalOpen(true)}>
                <Button className="flex gap-2 items-center bg-purple-600 text-white">
                    <TbPlus className='w-4 h-4'/>
                    Add new Subscription
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] space-y-5">
                <DialogHeader className='space-y-3'>
                    <DialogTitle>Add your new subscription</DialogTitle>
                    <DialogClose 
                        onClick={() => setModalOpen(false)}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    >
                        <TbX />
                    </DialogClose>
                    <DialogDescription className='text-xs'>
                        Enter the details, and we'll help you manage and stay on top of your subscriptions with ease.
                    </DialogDescription>
                </DialogHeader>
                <SubscriptionForm refetch={refetch} setModalOpen={setModalOpen}/>
            </DialogContent>
        </Dialog>
    </> );
}
 
export default AddNewSubscription;