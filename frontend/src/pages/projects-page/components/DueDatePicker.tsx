

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useEffect } from "react"

interface DueDatePickerProps {
  selected: Date;
  onChange: (date: Date) => void;
}
 
export function DueDatePicker({selected, onChange}: DueDatePickerProps) {

  const [date, setDate] = useState<Date>(selected)


  useEffect(() => {
    setDate(selected)
  }, [selected])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
    setDate(selectedDate)
    onChange(selectedDate)
    }
  }
  
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {`${date ? format(date, "PPP") : <span>Pick a due date</span>}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}