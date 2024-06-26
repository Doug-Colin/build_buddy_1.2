import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CircleBackslashIcon,
  ClockIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
  ExclamationTriangleIcon,
  LapTimerIcon,
} from '@radix-ui/react-icons'

import { PauseCircle } from 'lucide-react'

import { taskSchema } from '@/validators/taskSchema'

export const taskLabels = [
  {
    value: 'General',
    label: 'General',
  },
  {
    value: 'Sourcing',
    label: 'Sourcing',
  },
  {
    value: 'Fabrication',
    label: 'Fabrication',
  },
  {
    value: 'Finishing',
    label: 'Finishing',
  },
  {
    value: 'Shipping',
    label: 'Shipping',
  },
  {
    value: 'Repair',
    label: 'Repair',
  },
  {
    value: 'Administrative',
    label: 'Administrative',
  },
  {
    value: 'Maintenance',
    label: 'Maintenance',
  },
]
export const taskStatuses = [
  {
    value: 'To Do',
    label: 'To Do',
    icon: CircleIcon,
  },
  {
    value: 'Underway',
    label: 'Underway',
    icon: ClockIcon,
  },
  {
    value: 'Completed',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
  {
    value: 'Paused',
    label: 'Paused',
    icon: PauseCircle,
  },
  {
    value: 'Canceled',
    label: 'Canceled',
    icon: CircleBackslashIcon,
  },
]

export const taskPriorities = [
  {
    value: 'Lowest',
    label: 'Lowest',
    icon: ArrowDownIcon,
  },
  {
    value: 'Low',
    label: 'Low',
    icon: ArrowRightIcon,
  },
  {
    value: 'High',
    label: 'High',
    icon: ArrowUpIcon,
  },
  {
    value: 'Urgent',
    label: 'Urgent',
    icon: ExclamationTriangleIcon,
  },
]

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {taskLabels.map((eachLabel) => (
                // check into necessity of key/value pair props, as you're currently using an array. May make sense to
                <DropdownMenuRadioItem
                  key={eachLabel.label}
                  value={eachLabel.value}
                >
                  {eachLabel.value}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
