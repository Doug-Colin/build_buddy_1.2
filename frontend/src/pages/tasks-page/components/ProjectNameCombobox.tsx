// ---------------------------- NEW VERSION ----------------------------------
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getProjects } from "@/features/projects/projectSlice";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


interface ProjectNameComboBoxProps {
  selectedValue: string;
  onChange: (selectedValue: string) => void;
}
 
// export function DueDatePicker({selected, onChange}: DueDatePickerProps) {
// */


export function ProjectNameCombobox({selectedValue, onChange}: ProjectNameComboBoxProps) {
  //local states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  //get projects array from redux global state
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue);
    }
  }, [selectedValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {/* Chained ternary - check if 'value' exists (value here is searchQuery from CommandInput below). 
              If so, .find() project with a matching projectName, and return it's projectName.
              If not, return "Select project.." so .find() doesn't return undefined and mess things up.  */}
          {value
            ? projects.find((project) => project.projectName === value)
                ?.projectName
            : "Select project..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* Input for searching projects, 'onValueChange' updates 'searchQuery' upon user input */}
          <CommandInput
            placeholder="Search projects..."
            value={searchQuery}
            onValueChange={(search) => setSearchQuery(search)}
          />
          <CommandEmpty>Project not found.</CommandEmpty>
          <CommandGroup>
            {projects.map((project) => (
              <CommandItem
                key={project.projectName}
                value={value}
                onSelect={() => {
                  onChange(project.projectName);
                  setOpen(false);
                }}
              >
                {/* Show check icon upon user selection, otherwise hide by reducing opacity to 0.*/}
                <Check
                  className={cn(
                    value === project.projectName ? "opacity-100" : "opacity-0"
                  )}
                />
                {project.projectName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}


//------------------ OLD VERSION - LOCAL STATE ETC----------------------------
// (expand)
// import { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import { getProjects } from "@/features/projects/projectSlice";

// import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button, Separator } from "@/components/ui";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// /*
// interface ProjectsComboboxProps {
//   selected: Date;
//   onChange: (date: Date) => void;
// }
 
// export function DueDatePicker({selected, onChange}: DueDatePickerProps) {
// */


// export function ProjectsCombobox() {
//   //local states
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   //get projects array from redux global state
//   const dispatch = useAppDispatch();
//   const projects = useAppSelector((state) => state.projects.projects);

//   useEffect(() => {
//     dispatch(getProjects());
//   }, [dispatch]);

//   useEffect(() => {
//     if (selected) {
//       setValue(selected);
//     }
//   }, [selected]);

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[200px] justify-between"
//         >
//           {/* Chained ternary - check if 'value' exists (value here is searchQuery from CommandInput below). 
//               If so, .find() project with a matching projectName, and return it's projectName.
//               If not, return "Select project.." so .find() doesn't return undefined and mess things up.  */}
//           {value
//             ? projects.find((project) => project.projectName === value)
//                 ?.projectName
//             : "Select project..."}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           {/* Input for searching projects, 'onValueChange' updates 'searchQuery' upon user input */}
//           <CommandInput
//             placeholder="Search projects..."
//             value={searchQuery}
//             onValueChange={(search) => setSearchQuery(search)}
//           />
//           <CommandEmpty>Project not found.</CommandEmpty>
//           <CommandGroup>
//             {projects.map((project) => (
//               <CommandItem
//                 key={project.projectName}
//                 value={value}
//                 onSelect={() => {
//                   onChange(project.projectName);
//                   setOpen(false);
//                 }}
//               >
//                 {/* Show check icon upon user selection, otherwise hide by reducing opacity to 0.*/}
//                 <Check
//                   className={cn(
//                     value === project.projectName ? "opacity-100" : "opacity-0"
//                   )}
//                 />
//                 {project.projectName}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }


