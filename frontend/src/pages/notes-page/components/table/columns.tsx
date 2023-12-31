import { ColumnDef } from '@tanstack/react-table'
// import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'

import { Button, Checkbox } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// Use Zod task schema.
import { z } from 'zod'
import { taskSchema } from '@/validators/taskSchema'

export interface Note {
  _id: string
  noteTitle: string
  noteContent?: null | Object
  noteLabel: 'Project' | 'Task' | 'Client' | 'General'
  projectId?: string
  taskId?: string
  client?: string
  createdAt?: string
  updatedAt?: string
}

export const columns: ColumnDef<z.infer<typeof taskSchema>>[] = [
  //checkbox select to select invididual or all notessssss
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'noteTitle',
    header: 'Title',
  },
  // {
  //   accessorKey: 'client',
  //   header: 'Client',
  // },
  // {
  //   accessorKey: 'taskName',
  //   header: 'Task',
  // },
  // {
  //   accessorKey: 'taskDescription',
  //   header: 'Description',
  // },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => {
  //     //automatically sorts table asc or desc when user toggles header cell & sort icon
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => {
  //     //automatically sorts table asc or desc when user toggles header cell & sort icon
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Priority
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  {
    id: 'actions',
    //access the row data using row.original in the cell function. Use this to handle actions for your row eg. use the id to make a DELETE call to your API.
    cell: ({ row }) => {
      const task = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task.taskName)}
            >
              Update Note
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View project</DropdownMenuItem>
            <DropdownMenuItem>View client</DropdownMenuItem>
            <DropdownMenuItem>View task details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
