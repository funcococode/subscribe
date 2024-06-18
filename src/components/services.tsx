"use client"
import { type UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/actions/services";
import type { AddSubscriptionForm } from "@/types";

interface Props{
    form: UseFormReturn<AddSubscriptionForm, any, undefined>
}

const Services = ({form}: Props) => {
    const fetchData = async () => {
      const response = await getServices();
      return response?.data;
    }
    const {data} = useQuery({queryKey: ['services'], queryFn: fetchData});

    return ( <>
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Services</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data?.map(service => 
                    <SelectItem key={service?.id} value={service?.id}>{service?.name}</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {/* <FormDescription>
                Category of your subscription
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
    </> );
}
 
export default Services;