import * as React from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Search }  from 'lucide-react'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">     
      <div className="relative ml-auto flex-1 md:grow-0">
      <Search  />
            <Input
              type="search"
              placeholder="Search Tasks..."
              value={
                (table.getColumn('taskDescription')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table
                  .getColumn('taskDescription')
                  ?.setFilterValue(event.target.value)
              }
              className="w-[160px] h-8 rounded-lg bg-background pl-8 lg:w-[336px]"
            /> 
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
