//type for properties of data sent to backend when user registers or logs in via form
export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

//type for properties of data sent to backend when user registers or logs in via form
export interface LoginUserData {
  email: string;
  password: string;
}

//Type for properties of the user data
export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface Project {
  _id?: string;
  projectName: string;
  client?: string;
  dueDate: Date;
  status?: "In progress" | "Completed" | "Long-Term";
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectFormProps {
  onFormSubmit: (state: boolean) => void;
}

export interface ProjectFormType {
  projectName: string;
  client?: string;
  dueDate: Date;
  status?: "In progress" | "Completed" | "Long-Term";
}

export interface Task {
  _id?: string;
  projectName: string;
  client?: string;
  label:
    | "General"
    | "Sourcing"
    | "Fabrication"
    | "Finishing"
    | "Shipping"
    | "Repair"
    | "Administrative"
    | "Maintenance";
  taskName: string;
  taskDescription: string;
  status: "To Do" | "In Progress" | "Done" | "Paused" | "Canceled";
  priority: "Low" | "Medium" | "High" | "Urgent";
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskFormProps {
  onFormSubmit: (state: boolean) => void;
}
export interface TaskFormType {
  projectName: string;
  client?: string;
  label:
    | "General"
    | "Sourcing"
    | "Fabrication"
    | "Finishing"
    | "Shipping"
    | "Repair"
    | "Administrative"
    | "Maintenance";
  taskName: string;
  taskDescription: string;
  status: "To Do" | "In Progress" | "Done" | "Paused" | "Canceled";
  priority: "Low" | "Medium" | "High" | "Urgent";
}
