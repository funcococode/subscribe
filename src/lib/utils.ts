import type { BillingCycleTypes } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { addDays, addMonths, addWeeks, addYears, getDate, getDay, getMonth, isAfter, startOfMonth, startOfWeek, startOfYear, subDays, subMonths } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNextPaymentDate(startDate : Date | string, billingCycle : BillingCycleTypes){
  let nextPaymentDate = null;
  let daysToAdd = 0, nextStarting = new Date();
  if(startDate && billingCycle !== 'onetime'){
      if(billingCycle === 'monthly'){
          daysToAdd = getDate(startDate);
          nextStarting = startOfMonth(addMonths(new Date(), 1))
      }else if (billingCycle === 'yearly'){
          daysToAdd = getDate(startDate);
          const month = getMonth(startDate);
          const nextYear = startOfYear(addYears(new Date, 1));
          const nextYearMonth = addMonths(nextYear, month);
          nextStarting = nextYearMonth
      }else if(billingCycle === 'weekly'){
          const dayToday = getDay(new Date());
          daysToAdd = getDay(startDate);
          if(dayToday < daysToAdd){
            nextStarting = addDays(startOfWeek(new Date()), daysToAdd);
          }else{
            const nextWeek = startOfWeek(addWeeks(new Date(), 1));
            nextStarting = addDays(nextWeek, daysToAdd);
          }
      }

      nextPaymentDate = subDays(addDays(nextStarting, daysToAdd), 5);
  }

  return nextPaymentDate;
}

export function getDateRangeStartEndByKeyword(value : string){
  const payload = {
    from : new Date(),
    to : new Date()
  };
  switch(value){
      case 'l7d':
          return {
              from : subDays(new Date(), 7),
              to: subDays(new Date(), 1)
          }
      case 'l15d':
          return {
              from : subDays(new Date(), 15),
              to: subDays(new Date(), 1)
          }
      case 'l30d':
          return {
              from : subDays(new Date(), 30),
              to: subDays(new Date(), 1)
          }
      case 'lm':
          return {
              from : subMonths(startOfMonth(new Date()), 1),
              to: subDays(startOfMonth(new Date()), 1)
          }
      case 'mtd':
          return {
              from : startOfMonth(new Date()),
              to: new Date()
          }
      case 'ytd':
          return {
              from : startOfYear(new Date()),
              to: new Date()
          }
      default: return payload
  }
}