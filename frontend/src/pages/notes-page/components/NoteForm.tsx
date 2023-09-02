import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useForm } from 'react-hook-form'
import { RootState } from '@/app/store'
import { getProjects } from '@/features/projects/projectSlice'
import { getTasks } from '@/features/tasks/taskSlice'
import { createNote } from '@/features/notes/noteSlice'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { noteSchema } from '@/validators/noteSchema'
import { Project, NoteFormProps, NoteDTO } from '@/types/types'


import { Button, Input } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type Input = z.infer<typeof noteSchema>



export default function NoteForm({ onFormSubmit }: NoteFormProps) {
  const dispatch = useAppDispatch()
  const projects = useAppSelector((state: RootState) => state.projects.projects)

  const noteLabelOptions: string[] = [
    'Project','Task', 'Client', 'General'
  ]

  function onSubmit(data: NoteDTO ) {
    dispatch(createNote(data))
    //console.log(`Here is entered form data: ${data}`)
    onFormSubmit(false)
  }

  const form = useForm<Input>({
    resolver: zodResolver(noteSchema),
    defaultValues: {},
  })

  console.log(form.watch())

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  return (
    //centered
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Input for Note Title */}
        <FormField
            control={form.control}
            name="noteTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* input for projectName so note can be associated with project*/}
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Project</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose the parent project of this note" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects.map((project: Project) => {
                      return (
                        <SelectItem
                          key={project._id}
                          value={project._id}
                        >
                          {project.projectName}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Attach notes to projects so you can duplicate them along with
                  the project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* input for note's label*/}
          <FormField
            control={form.control}
            name="noteLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose note label" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {noteLabelOptions.map((label, index) => {
                      return (
                        <SelectItem key={index} value={label}>
                          {label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Label your notes to help keep them organized.
                </FormDescription>
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
