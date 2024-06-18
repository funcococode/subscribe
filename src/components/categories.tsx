"use client"
import { type UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { getCategories } from "@/actions/categories";
import { useQuery } from "@tanstack/react-query";

interface Props{
    form: UseFormReturn<{
        service: string;
        purchase_date: Date;
        amount: string;
        category: string;
        billing_cycle: string;
    }, any, undefined>
}

const Categories = ({form}: Props) => {
    const fetchData = async () => {
      const response = await getCategories();
      return response?.data;
    }
    const {data} = useQuery({queryKey: ['categories'], queryFn: fetchData});

    return ( <>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data?.map(category => 
                    <SelectItem key={category?.id} value={category?.id}>{category?.name}</SelectItem>
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
 
export default Categories;