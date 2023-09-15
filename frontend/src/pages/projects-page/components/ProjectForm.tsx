import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui'
import { DueDatePicker } from '@/pages/projects-page/components/DueDatePicker'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { projectSchema } from '@/validators/projectSchema'
import { createProject } from '@/features/projects/projectSlice'
import { useAppDispatch } from '@/app/hooks'
import { ProjectFormType, ProjectFormProps } from '@/types/types'

export default function ProjectForm({ onFormSubmit }: ProjectFormProps) {
  type Input = z.infer<typeof projectSchema>

  const form = useForm<Input>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: '',
      client: '',
      dueDate: new Date(),
      status: 'In progress',
    },
  })

  const dispatch = useAppDispatch()

  function onSubmit(data: ProjectFormType) {
    dispatch(createProject(data))
    console.log(data)
    onFormSubmit(false)
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
  )
}
