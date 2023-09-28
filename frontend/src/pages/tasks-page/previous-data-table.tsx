//---------- Tables with shadcn table and tanstack table ------------------------

//---------- data-table.tsx (client component) will contain our <DataTable /> component. ------------------------

//Note: The <DataTable /> component renders our table.

//Tip: If you find yourself using <DataTable /> in multiple places, this is the component you could make reusable by extracting it to components/ui/data-table.tsx. For example: <DataTable columns={columns} data={data} />
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnFiltersState,
} from '@tanstack/react-table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button, Input } from '@/components/ui'
import FormDialog from '@/components/FormDialog'
import TaskForm from '@/pages/tasks-page/components/TaskForm'
import { useFormDialogState } from '@/hooks/useFormDialogState'
import { getTasks } from '@/features/tasks/taskSlice'

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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false)

/* --------------- *Adjust this an other features if nec.; get it right for Notes Table* ----------------------------
The best practice in React and Redux applications is to keep data fetching and state management as close to the top-level component as possible, which in your case would be TasksPage. This approach aligns with the principle of lifting state up, where you manage state in parent components and pass it down to child components as props. This makes your components more reusable and easier to manage.

In TasksPage, you're correctly dispatching getTasks() and selecting tasks from the global state. Passing these tasks as a prop to DataTable is a good approach. If DataTable doesn't display tasks when passed as props, the issue might be elsewhere, such as how columns are defined or how data is being used within DataTable.

Yes, this approach should be used for other features like Notes. It keeps components decoupled from specific data sources, promoting reusability and maintainability. Manage state in feature pages like NotesPage, and pass it down to components like tables or lists. This top-down data flow is indeed a fundamental concept in React.
 -------------------------------------------------------------- */


  //get user's tasks o array can be mapped to table
  // useEffect(() => {
  //   dispatch(getTasks())
  // }, [dispatch])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //sorting & filtering
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    //visibilty
    onColumnVisibilityChange: setColumnVisibility,
    //row selection
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        {/* Display amount of checkbox selected rows */}
        {/*
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> 
        */}

        {/* Search Component to filter by projectName column (can enable for other columns as well)  */}
        <Input
          placeholder="Filter tasks by <insert filter criteria here>..."
          value={
            (table.getColumn('projectName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('projectName')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="ml-auto space-">
          <FormDialog
            title="Create Task"
            description="Fill out the form to create a new Task. Click save when you're done."
            isOpen={isFormDialogOpen}
            onFormSubmissionCloseDialog={handleFormDialogClose}
            formComponent={<TaskForm onFormSubmit={handleFormDialogClose} />}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">View Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
