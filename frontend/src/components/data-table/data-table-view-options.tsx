import * as React from 'react'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="l-auto h-8 md:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          <span className='hidden md:inline'>Columns</span>
        </Button>
      </DropdownMenuTrigger>
      {/* Got rid of 150px width trying to make table responsive */}
      {/* <DropdownMenuContent align="end" className="w-[150px]"> */}
      <DropdownMenuContent align="end" className="">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/*
Table starts compressing at 908px and below
SO, I need to toggle a column off at that width, and further toggle other columns upon the next breakpoint
-description is currently the largest so lets start with toggling off the largest to smallest
-Importance matters though...

1) Switch to Icons. Then see how small it is before breaking. 
-How about we switch to icons for the icon columns first:
  Completion Status: Active (circle arrow), Paused, Completed (checkmark), Canceled, Unknown (question)
  Canceled=X, unknown = question mark
  Priority:  Low, Lowest, Important, Urgent (Lowest, Medium, high. Highest/Urgent)

2) Then, toggle off columns.  

Other UI tasks:
-make it so table isn't massive if not necessary (center more on screen, lots of space on largest screen after buttons at right)
-Make item detailed view

*/
