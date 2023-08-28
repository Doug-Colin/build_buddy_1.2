import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/validators/taskSchema";
import { getProjects } from "@/features/projects/projectSlice";
import { createTask } from "@/features/tasks/taskSlice";
import { TaskFormProps, TaskFormType, Project } from "@/types/types";

import { Button, Input } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RootState } from "@/app/store";

type Input = z.infer<typeof taskSchema>;

export default function TaskForm({ onFormSubmit }: TaskFormProps) {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(
    (state: RootState) => state.projects.projects
  );

  const taskLabelOptions: string[] = [
    "General",
    "Sourcing",
    "Fabrication",
    "Finishing",
    "Shipping",
    "Repair",
    "Administrative",
    "Maintenance",
  ];
  const taskStatusOptions: string[] = [
    "To Do",
    "In Progress",
    "Done",
    "Paused",
    "Canceled",
  ];
  const taskPriorityOptions: string[] = ["Low", "Medium", "High", "Urgent"];

  function onSubmit(data: TaskFormType) {
    dispatch(createTask(data));
    console.log(data);
    onFormSubmit(false);
    //debugging
    console.log("Dispatched task creation:", data);
  }

  const form = useForm<Input>({
    resolver: zodResolver(taskSchema),
    defaultValues: {},
  });

  console.log(form.watch());

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    //centered
    <div>
      {/* spread attributes from r-h-f useForm() variable into form component */}
      <Form {...form}>
        {/* define normal html form tag; pass onSubmit handler into the r-h-f form.handleSubmit utility */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* actual rendering of the form */}

          {/*  */}
          {/* <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <FormControl>
                      <div className="w-full">
                        <Controller
                          name="projectName"
                          control={form.control}
                          render={({ field }) => (
                            <ProjectNameCombobox
                              selectedValue={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

          {/* Select input for projectName*/}
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Project</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose the parent project of this task" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects.map((project: Project) => {
                      return (
                        <SelectItem
                          key={project._id}
                          value={project.projectName}
                        >
                          {project.projectName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Attach tasks to projects so you can duplicate them along with
                  the project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select input for label*/}
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose task label" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {taskLabelOptions.map((label, index) => {
                      return (
                        <SelectItem key={index} value={label}>
                          {label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Label your tasks to help keep them organized.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* input for taskName*/}
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Create task name"
                    {...field}
                    type="taskName"
                    autoComplete="taskName"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* input for taskName*/}
          <FormField
            control={form.control}
            name="taskDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Briefly describe task"
                    {...field}
                    type="taskDescription"
                    autoComplete=""
                  />
                </FormControl>
                <FormDescription>Briefly describe task</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select input for status*/}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Completion Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose status of task " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {taskStatusOptions.map((status, index) => {
                      return (
                        <SelectItem key={index} value={status}>
                          {status}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>Choose task completion status</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select input for priority*/}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose priority of task" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {taskPriorityOptions.map((priority, index) => {
                      return (
                        <SelectItem key={index} value={priority}>
                          {priority}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>Choose task completion status</FormDescription>
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