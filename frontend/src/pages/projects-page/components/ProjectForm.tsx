import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui"
import { DueDatePicker } from "@/pages/projects-page/components/DueDatePicker";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/validators/projectSchema";
import { createProject } from "@/features/projects/projectSlice"; 
import { useAppDispatch, } from "@/app/hooks";



/*In parent component, declare state and handler to close FormDialog upon successful form submission:

//state for closing FormDialog upon succesfull form submission:
const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)

//handler for closing FormDialog child component when form is succesfully submitted:
  const handleFormDialogClose = (state: boolean) => {
    setIsFormDialogOpen(state);
  };
*/


export interface ProjectFormType {
  projectName: string;
  client?: string;
  dueDate: Date;
  status?: 'In progress' | 'Completed' | "Long-Term";
}
interface ProjectFormProps {
  onFormSubmit: () => void; // Replace with the actual type if different
}

export default function ProjectForm({onFormSubmit}: ProjectFormProps) {
type Input = z.infer<typeof projectSchema>;




  const form = useForm<Input>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      client: "",
      dueDate: new Date(),
      status: "In progress",
    },
  });

//check if form is updating state with each keystroke/selection
console.log(form.watch());

const dispatch = useAppDispatch();

// const { status, error, message } = useAppSelector((state) => state.projects);


  function onSubmit(data: ProjectFormType) {
    dispatch(createProject(data))
    console.log(data);
    onFormSubmit()
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name of your project" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <div className="w-full">
                    <Controller
                      name="dueDate"
                      control={form.control}
                      render={({ field }) => (
                        <DueDatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                        />
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In progress">In progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Long-Term">Long-Term</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
