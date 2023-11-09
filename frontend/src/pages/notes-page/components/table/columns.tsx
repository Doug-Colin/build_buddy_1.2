import { ColumnDef } from '@tanstack/react-table'
// import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'
import { useAppDispatch} from '@/app/hooks'
import { setCurrentNote, clearCurrentNote } from '@/features/notes/noteSlice'
import { Button, Checkbox } from '@/components/ui'
import { Note } from '@/types/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// Use Zod note schema.
// import { z } from 'zod'
// import { noteSchema } from '@/validators/noteSchema'

//export const columns: ColumnDef<z.infer<typeof noteSchema>>[] = [
export const columns: ColumnDef<Note, any>[] = [
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
    cell: ({ row }) => {
      const dispatch = useAppDispatch()
      const title = row.original.noteTitle

      return (
        <Button
          variant="ghost"
          onClick={() => {
            dispatch(clearCurrentNote())
            dispatch(setCurrentNote(row.original))
          }}
        >
          {title}
        </Button>
      )
    },
  },

  {
    id: 'actions',
    //access the row data using row.original in the cell function. Use this to handle actions for your row eg. use the id to make a DELETE call to your API.
    cell: ({ row }) => {
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
            {/* DEFINITELY HAVE TO ADJUST THIS SHIT */}
            <DropdownMenuItem
            // onClick={() => navigator.clipboard.writeText(task.taskName)}
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
