import { deleteSubscription } from "@/actions/subscriptions";
import { queryClient } from "@/app/layout";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TbTrash } from "react-icons/tb";
import { toast } from "sonner";

interface Props{
    subscriptionId: string
}

const DeleteSubscription = ({subscriptionId}: Props) => {
    const router = useRouter();

    const {mutateAsync} = useMutation({mutationKey: ['delete-subscription'], mutationFn: (id: string) => deleteSubscription(id)}) 

    const remove = async (id: string) => {
        const response = await mutateAsync(id)
        if(response?.data?.id){
            await queryClient.refetchQueries({queryKey: ['subscriptions']});
            router.back();
            toast.error(`Subscription Removed`, {
                icon: <TbTrash />
            })
        }
    }

    return ( <>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='bg-red-500 hover:bg-red-500 bg-opacity-10 hover:bg-opacity-20 font-normal text-red-500 shadow-none flex items-center gap-2 text-xs py-0.5 h-7'>
                    <TbTrash />
                    Delete Subscription
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the subscription record from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove(subscriptionId)} className="bg-red-500 hover:bg-red-500 font-normal text-red-50 shadow-none flex items-center gap-2">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </> );
}
 
export default DeleteSubscription;