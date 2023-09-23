// import { user } from '@/app/store';
/* Auth Types. */

export interface RegisterUserData {
  name: string
  email: string
  password: string
}

export interface LoginUserData {
  email: string
  password: string
}
export interface User {
  _id: string
  name: string
  email: string
  token: string
}

/* Projects feature. */
export interface Project {
  _id: string
  projectName: string
  client?: string
  dueDate: Date
  status?: 'In progress' | 'Completed' | 'Long-Term'
  createdAt?: string
  updatedAt?: string
}

export interface ProjectFormProps {
  onFormSubmit: (state: boolean) => void
}

export interface ProjectFormType {
  projectName: string
  client?: string
  dueDate: Date
  status?: 'In progress' | 'Completed' | 'Long-Term'
}

/* Tasks feature. */
export interface Task {
  _id: string
  projectName: string
  client?: string
  label:
    | 'General'
    | 'Sourcing'
    | 'Fabrication'
    | 'Finishing'
    | 'Shipping'
    | 'Repair'
    | 'Administrative'
    | 'Maintenance'
  taskName: string
  taskDescription: string
  status: 'To Do' | 'In Progress' | 'Done' | 'Paused' | 'Canceled'
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  createdAt?: string
  updatedAt?: string
}

export interface TaskFormProps {
  onFormSubmit: (state: boolean) => void
}
export interface TaskFormType {
  projectName: string
  client?: string
  label:
    | 'General'
    | 'Sourcing'
    | 'Fabrication'
    | 'Finishing'
    | 'Shipping'
    | 'Repair'
    | 'Administrative'
    | 'Maintenance'
  taskName: string
  taskDescription: string
  status: 'To Do' | 'In Progress' | 'Done' | 'Paused' | 'Canceled'
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
}

/* Notes feature. */
export interface Note {
  _id: string
  noteTitle: string
  // noteContent?: null | Object
  noteLabel: 'Project' | 'Task' | 'Client' | 'General'
  projectId?: string
  taskId?: string
  client?: string
  createdAt?: string
  updatedAt?: string
}
export interface NoteFormProps {
  onFormSubmit: (state: boolean) => void
}

export interface NoteDTO {
  noteTitle: string
  // noteContent?: null | Object
  noteLabel: 'Project' | 'Task' | 'Client' | 'General'
  projectId?: string
  taskId?: string
  client?: string
}