'use client'
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { LuCalendar } from "react-icons/lu"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

import BillingCycle from "./billing-cycle"
import { TbLoader2, TbPlus } from "react-icons/tb"
import Services from "./services"
import { addSubscription } from "@/actions/subscriptions"
import { toast } from "sonner";
import { useEffect, type Dispatch, type SetStateAction } from "react"
import type { RefetchType } from "@/types"
import { useMutation } from "@tanstack/react-query"

const formSchema = z.object({
  service: z.string().min(1, {
    message: "Service name must be at least 2 characters.",
  }),
  description: z.string(),
  purchase_date: z.date(),
  amount: z.string().min(0, {
    message: "Amount can not be empty"
  }),
  billing_cycle: z.string().min(1, {
    message: "Billing cycle information is required"
  })
})

interface Props{
  refetch : RefetchType,
  setModalOpen : Dispatch<SetStateAction<boolean>>
}

export default function SubscriptionForm({refetch, setModalOpen}: Props){
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      description: "",
      purchase_date: new Date(),
      amount: "",
      billing_cycle: ""
    },
  })

  const {mutate, isPending,isSuccess, isError} = useMutation({mutationKey: ['add-subscription-form'], mutationFn: (values : z.infer<typeof formSchema>) => addSubscription(values)})

  useEffect(() => {
    if(isSuccess){
        toast.success('Subscription added!');
        form.reset();
        refetch().then(_ => setModalOpen(false)).catch(err => console.log(err))
    }
      
    if(isError){
        toast.error('Some error occured!')
        form.reset();
        setModalOpen(false)
    }
  },[isSuccess, isError])
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => mutate(values))} className="space-y-8">
        <Services form={form} />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subscription Name <span className='text-xs text-gray-500'>(Optional)</span> </FormLabel>
              <FormControl>
                <Input placeholder="Netflix Personal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchase_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                Date when you subscribed to the services
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Categories form={form} />  */}

        <div className="flex gap-5">
          <div className='flex-1'>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="90.8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <BillingCycle form={form} />
          </div>
        </div>
        
        <footer className='flex justify-end'>
          <Button type="submit" disabled={isPending} className="w-44 flex items-center gap-2 bg-purple-700 text-white hover:bg-purple-800">
            {isPending ? <TbLoader2 className='animate-spin' /> : <TbPlus />}
            {!isPending && "Create"}
          </Button>
        </footer>
      </form>
    </Form>
  )
}
