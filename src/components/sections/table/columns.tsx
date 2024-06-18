"use client"

import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table"
import { TbArrowsUpDown, TbArrowUpRight, TbPencil } from "react-icons/tb";
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link";
import { type Subscription } from "@/types";
import BrandLogo from "./brand-logo";
import StatusBadge from "@/components/status-badge";


export const columns: ColumnDef<Subscription>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: 'service_link'
    },
    {
        accessorKey: 'description'
    },
    {
        accessorKey: 'id'
    },
    {
        accessorKey: "service",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="p-0 text-gray-400 font-light"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Services
                <TbArrowsUpDown className="ml-2" />
              </Button>
            )
        },
        cell : ({row}) => {
            const service: string = row.getValue('service');
            const classname = 'flex items-center gap-2 hover:text-purple-600 hover:underline underline-offset-4';
            return <div className='flex items-center gap-5'>
              <span className='text-2xl p-2 rounded-lg bg-purple-100'>
                <BrandLogo brandname={service} />
              </span>
              <div>
                <Link href={row.getValue('service_link')} target="__blank" className={classname}>
                    {service}
                    <TbArrowUpRight className=""/>
                </Link>
                <span className='text-xs text-gray-400'>
                  {row?.getValue('description')}
                </span>
              </div>
            </div>
        }
    },
    {
        accessorKey: "start_date",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="p-0 text-gray-400 font-light"
                onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
              >
                Purchase Date
                <TbArrowsUpDown className="ml-2" />
              </Button>
            )
        },
        cell : ({row}) => {
            const start_date: string = row.getValue('start_date');
            const classname = 'text-gray-400';
            return <span className={classname}>{start_date}</span>
        }
    },
    {
        accessorKey: "next_billing",
        header: "Next Payment",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell : ({row}) => {
            const status: string = row.getValue('status');
            return <StatusBadge status={status} />
        }
    },
    {
        accessorKey: "cycle",
        header: "Billing Cycle",
        cell : ({row}) => {
            const cycle: string = row.getValue('cycle');
            const classname = 'capitalize';
            return <span className={classname}>{cycle}</span>
        }
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="p-0 text-gray-400 font-light text-right flex w-full justify-end"
                onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
              >
                Amount
                <TbArrowsUpDown className="ml-2" />
              </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount)
        
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
      id: "Edit",
      cell: ({ row }) => (
        <Button className={``} variant={"ghost"} size={'icon'} asChild>
          <Link href={`/subscriptions/edit/${row.original.id}`}>
            <TbPencil />
          </Link>
        </Button>
      ),
    },
]
