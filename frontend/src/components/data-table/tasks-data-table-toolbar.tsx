
/* 
  *********************** Following Version was erroneously edited for TasksDataTable. ************************
  *********************** Below erroneous component is original data-table-toolbar.tsx. ************************
*/


import * as React from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Search, PlusCircle, LucideTrash2 } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DeletionAlertDialog from '@/components/DeletionAlertDialog'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'

// imports for DropdownMenu
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  getTasks,
  deleteTask,
  duplicateTask,
  updateTask,
} from '@/features/tasks/taskSlice'

import { Task } from '@/types/types'
import { useAppDispatch } from '@/app/hooks'

//imports for DataTableRowActions incorporated into this component, DataTableToolbar, on screens md and below
import { LucideCopyPlus } from 'lucide-react'
interface DataTableToolbarProps<TData> {
  table: Table<TData>
  task: Task
}

export function DataTableToolbar<TData>({
  table,
  task,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center justify-between">
      <Button size="sm" className="h-8 gap-1">
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          New Task
        </span>
      </Button>
      <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search Tasks..."
        value={
          (table.getColumn('taskDescription')?.getFilterValue() as string) ?? ''
        }
        onChange={(event) =>
          table.getColumn('taskDescription')?.setFilterValue(event.target.value)
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
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <LucideCopyPlus className="mr-2 h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Duplicate
          </span>
        </Button>
        <DeletionAlertDialog
          button={
            <Button variant="outline">
              <LucideTrash2 className="mr-2 h-4 w-4" />
              <div className="hidden lg:flex">Delete</div>
            </Button>
          }
          alertDialogTitle={`Are you sure you want to delete this task?`}
          alertDialogDescription={`If you delete ${task.taskName}, it cannot be undone.`}
          alertDialogAction="Delete"
          onDelete={() => dispatch(deleteTask(task._id))}
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

// import * as React from 'react'

// import { Cross2Icon } from '@radix-ui/react-icons'
// import { Table } from '@tanstack/react-table'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>
// }

// export function DataTableToolbar<TData>({
//   table,
// }: DataTableToolbarProps<TData>) {
//   const isFiltered = table.getState().columnFilters.length > 0

//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex flex-1 items-center space-x-2">
//         <Input
//           placeholder="Filter tasks..."
//           value={
//             (table.getColumn('taskDescription')?.getFilterValue() as string) ??
//             ''
//           }
//           onChange={(event) =>
//             table
//               .getColumn('taskDescription')
//               ?.setFilterValue(event.target.value)
//           }
//           className="h-8 w-[150px] lg:w-[250px]"
//         />
//         {isFiltered && (
//           <Button
//             variant="ghost"
//             onClick={() => table.resetColumnFilters()}
//             className="h-8 px-2 lg:px-3"
//           >
//             Reset
//             <Cross2Icon className="ml-2 h-4 w-4" />
//           </Button>
//         )}
//       </div>
//       <DataTableViewOptions table={table} />
//     </div>
//   )
// }
