"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
  
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import { TbArrowLeft, TbArrowRight, TbCalendarRepeat, TbSearch } from "react-icons/tb"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        initialState: {
            columnVisibility: {
                service_link :false,
                description: false,
                id: false,
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    return (
        <div className='bg-white border rounded-lg mt-10'>
            <header className='flex justify-between items-center px-5'>
                <h1 className='flex items-center gap-2 font-medium text-sm'>
                    <span className='p-2 text-xl rounded-full bg-purple-600/10 text-purple-600'>
                        <TbCalendarRepeat />
                    </span>
                    All Subsciptions
                </h1>
                <div className='flex items-center gap-2'>
                    <div className="flex items-center py-4 relative">
                        <TbSearch className='absolute left-2 top-1/2 -translate-y-1/2 text-md text-gray-400' />
                        <Input
                            placeholder="Search"
                            value={(table.getColumn("service")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("service")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm pl-8"
                        />
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                            className="flex-1 flex items-center gap-1 cursor-pointer hover:border-gray-600"
                            variant="outline"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <TbArrowLeft />
                        </Button>
                        <Button
                            className="flex-1 flex items-center gap-1 cursor-pointer hover:border-gray-600"
                            variant="outline"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <TbArrowRight />
                        </Button>
                    </div>
                </div>
            </header>
            <div className="border-y">
                <Table>
                    <TableHeader className="bg-gray-100/30">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-gray-400 font-light">
                                            {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                            <TableRow
                                
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                <TableCell className='py-5' key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                                ))}
                            </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-gray-400 text-center">
                                    No data found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center  px-5'>
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        className="flex-1 flex items-center gap-1 cursor-pointer hover:border-gray-600"
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <TbArrowLeft />
                        Previous
                    </Button>
                    <Button
                        className="flex-1 flex items-center gap-1 cursor-pointer hover:border-gray-600"
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next    
                        <TbArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
