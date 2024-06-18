"use client"
import { type UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { AddSubscriptionForm } from "@/types";

interface Props{
    form: UseFormReturn<AddSubscriptionForm, any, undefined>
}

const BillingCycle = ({form}: Props) => {
    return ( <>
        <FormField
          control={form.control}
          name="billing_cycle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Cycle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Billing Cycle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="onetime">One Time</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              {/* <FormDescription>
                Your subscription payment cycle duration i.e. Monthly, Weekly, Yearly
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
    </> );
}
 
export default BillingCycle;