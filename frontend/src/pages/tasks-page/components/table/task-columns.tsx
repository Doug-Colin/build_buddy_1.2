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
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
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
      //<div className="hidden lg:flex">
      <div >
        <DataTableColumnHeader column={column} title="Label" />
      </div>
    ),
    cell: ({ row }) => {
      const label = taskLabels.find(
        (label) => label.value === row.original.label,
      )

      return (
        //<div className="hidden lg:flex space-x-2">
        <div >
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
      //<div className="hidden lg:flex">
      <div className='max-w-[190px]'>
        <DataTableColumnHeader column={column} title="Description" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="max-w-[190px] max-h-fit">{row.getValue('taskDescription')}</div>
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

  // Original implementation of actions, only visible upon clicking horizontal dots icon
  {
    id: 'actions',
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
        <>
          {/* For screens below xl (1280px), hide actions in three-dots icon dropdown. */}
          <div className="xl:hidden">
            <DataTableRowActions row={row} />
          </div>
          {/* For screens xl and above, display actions as buttons with distinct icons. */}
          <div className="hidden xl:flex justify-start gap-4">
            {/* Adjust onClick fn so that the task opens to the other view instead */}
            <Button variant="outline" onClick={handleDuplicate}>
              <LucideEdit className="mr-2 h-4 w-4" />
              <div className="hidden lg:flex">Edit</div>
            </Button>
            <Button variant="outline" onClick={handleDuplicate}>
              <LucideCopyPlus className="mr-2 h-4 w-4" />
              <div className="hidden lg:flex">Duplicate</div>
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
              onDelete={onDelete}
            />
          </div>
        </>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]

// // Row actions that aren't hidden, with explicit buttons for more intuitive UI

// {
//   accessorKey: 'actions',
//   header: ({ column }) => (
//     <DataTableColumnHeader column={column} title="Actions" />
//   ),
//   cell: ({ row }) => {
//     const task = row.original // Assuming row.original contains the task data
//     const dispatch = useAppDispatch()
//     const handleDuplicate = () => {
//       dispatch(duplicateTask(task))
//     }

//     const onDelete = () => {
//       dispatch(deleteTask(task._id))
//     }

//     return (
//       <div className="flex justify-start gap-4">
//         {/* Adjust onClick fn so that the task opens to the other view instead */}
//         <Button variant="outline" onClick={handleDuplicate}>
//           <LucideEdit className="mr-2 h-4 w-4" />
//           <div className="hidden lg:flex">Edit</div>
//         </Button>

//         <Button variant="outline" onClick={handleDuplicate}>
//           <LucideCopyPlus className="mr-2 h-4 w-4" />
//           <div className="hidden lg:flex">Duplicate</div>
//         </Button>

//         <DeletionAlertDialog
//           button={
//             <Button variant="outline">
//               <LucideTrash2 className="mr-2 h-4 w-4" />
//               <div className="hidden lg:flex">Delete</div>
//             </Button>
//           }
//           alertDialogTitle={`Are you sure you want to delete this task?`}
//           alertDialogDescription={`If you delete ${task.taskName}, it cannot be undone.`}
//           alertDialogAction="Delete"
//           onDelete={onDelete}
//         />
//       </div>
//     )
//   },
//   enableSorting: false,
//   enableHiding: false,
// },

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

/*
        'xs': '480px',    // Extra small devices
        'sm': '640px',    // Small devices (default)
        'md': '768px',    // Medium devices (default)
        'lg': '1024px',   // Large devices (default)
        'xl': '1280px',   // Extra large devices (default)
        '2xl': '1536px',  // 2x large devices (default)
        '3xl': '1800px',  // Custom large breakpoint
*/

/*
PseudoCode: Making the Data Table Rsponsive
-make Actions buttons dots unless xl: ; at xl: render full buttons (consult GPT to see which is more sensible or commonplace approach)
Done, NICE!!!
Next: Fix dissapearing Label and Description column headers, and also dissapearing View button. 
Hopefully the former fixes the latter. 
Then, Have the columns dissapear as screen sizes diminish by making them uncheced on view, because that actually fuckin gets rid of them. 
Then when people try to click more than what will fit on the wcreen you can say 'I'm sorry, only _ table columns are viewable at this screen size'

*** Before dissapearing columns: ***
            -@ 1024: In Progress -> 'Underway' change on backend & in DB entries as well. 
            -@ 909 is issue, so change 'In Progress' to 'Underway'
                
            -Make Description and Task wrap less amounts of text from @md to @Doug-Colin
              -See what happens if you have a very long description. If it breaks UI add a '...' abbreviator to be max text length including '...'
              (lookup what thats called & how to)
            
              -see if that gets you to 768px see what 640 looks like (may need to start hiding columns or changing layout)
            
              -Mobile is still much smaller... At this point look into Mobile- should you create new card-based UI? Or change Rows to something
            
              -eventually change order to 'task, projecyt, priority, status, Descr., Label 

{
  //   id: 'actions',
  //   //access the row data using row.original in the cell function. Use this to handle actions for your row eg. use the id to make a DELETE call to your API.
  //   cell: ({ row }) => {
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //           // onClick={() => navigator.clipboard.writeText(task.taskName)}
  //           >
  //             Update Note
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View project</DropdownMenuItem>
  //           <DropdownMenuItem>View client</DropdownMenuItem>
  //           <DropdownMenuItem>View task details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
*/
