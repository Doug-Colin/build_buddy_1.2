import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { LucideCopyPlus, LucideEdit, LucideTrash2 } from 'lucide-react'
import { Button } from '@/components/ui'
import DeletionAlertDialog from '@/components/DeletionAlertDialog'
import { useAppDispatch } from '@/app/hooks'
import {
  taskLabels,
  taskPriorities,
  taskStatuses,
} from '@/pages/tasks-page/components/table/data-table-row-actions'
import {
  getTasks,
  deleteTask,
  duplicateTask,
  updateTask,
} from '@/features/tasks/taskSlice'
//import { Task } from "../data/schema"
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableRowActions } from '@/pages/tasks-page/components/table/data-table-row-actions'

// Use Zod task schema.

import { taskSchema } from '@/validators/taskSchema'
import { z } from 'zod'

type taskSchema = z.infer<typeof taskSchema>

export const taskColumns: ColumnDef<taskSchema>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'taskName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    // Function to define how the data in each row cell of this column should be rendered.
    // Fetch the value of the id property for each row & display in <div> 80px wide.
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('taskName')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'projectName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('projectName')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Client not currently a property on any Tasks!
  // {
  //   accessorKey: "clientName",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Client" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("clientName")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  //---------------- Only one working fine -----------------------------
  {
    accessorKey: 'label',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
    cell: ({ row }) => {
      const label = taskLabels.find(
        (label) => label.value === row.original.label,
      )

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          {/* <span className="max-w-[500px] truncate font-medium">
            {row.getValue('label')}
          </span> */}
        </div>
      )
    },
  },

  {
    accessorKey: 'taskDescription',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('taskDescription')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = taskStatuses.find(
        (status) => status.value === row.getValue('status'),
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = taskPriorities.find(
        (priority) => priority.value === row.getValue('priority'),
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    // Dictates how filtering works for this column.
    // TanStack filterFn: Returns true for what's included in column and false otherwise.
    // the id is the accessor key, and the value is the one currently applied to the colum.
    // Check if filter value includes the value from the rows column
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  // // Original implementation of actions, only visible upon clicking horizontal dots icon
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },

  // // Row actions that aren't hidden, with explicit buttons for more intuitive UI

  {
    accessorKey: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      const task = row.original // Assuming row.original contains the task data
      const dispatch = useAppDispatch()
      const handleDuplicate = () => {
        dispatch(duplicateTask(task))
      }

      const onDelete = () => {
        dispatch(deleteTask(task._id))
      }

      return (
        <div className="flex items-center">
          <Button variant="outline" onClick={handleDuplicate}>
            <LucideCopyPlus className="mr-2 h-4 w-4" />
            Duplicate
          </Button>

          <DeletionAlertDialog
            button={
              <Button variant="outline">
                <LucideTrash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            }
            alertDialogTitle={`Are you sure you want to delete this task?`}
            alertDialogDescription={`If you delete ${task.taskName}, it cannot be undone.`}
            alertDialogAction="Delete"
            onDelete={onDelete}
          />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]

/*

<Button variant="outline" onClick={handleDuplicate}>
            <LucideCopyPlus className="mr-2 h-4 w-4" />
            Duplicate
          </Button>

          <DeletionAlertDialog
            button={
              <Button variant="outline">
                <LucideTrash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            }
            alertDialogTitle={`Are you sure you want to delete this task`}
            alertDialogDescription={`If you delete ${task.taskName}, it cannot be undone.`}
            alertDialogAction="Delete"
            onDelete={onDelete}
          ></DeletionAlertDialog>

*/
