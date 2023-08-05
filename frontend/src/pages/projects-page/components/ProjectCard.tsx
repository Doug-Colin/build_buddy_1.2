import { useState, useEffect } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Label, Input, Button, Badge } from "@/components/ui";
import DeletionAlertDialog from "@/components/DeletionAlertDialog";

import StatusTabs from "@/pages/projects-page/components/StatusTabs";
import { DueDatePicker } from "@/pages/projects-page/components/DueDatePicker";
import { Project } from "@/features/projects/projectService";
import { useAppDispatch } from "@/app/hooks";
import {
  updateProject,
  deleteProject,
  duplicateProject,
} from "@/features/projects/projectSlice";
import { parseISO } from "date-fns";

import {
  LucideCopyPlus,
  LucideTrash2,
  LucideEdit,
  LucideSave,
  LucideX,
} from "lucide-react";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [projectName, setProjectName] = useState(project.projectName);
  const [client, setClient] = useState(project.client);
  const [dueDate, setDueDate] = useState(project.dueDate);
  const [status, setStatus] = useState(project.status);

  const dispatch = useAppDispatch();

  const dateObject = typeof dueDate === "string" ? parseISO(dueDate) : dueDate;

  useEffect(() => {
    setProjectName(project.projectName);
    setClient(project.client);
    setDueDate(project.dueDate);
    setStatus(project.status);
  }, [project]);

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = () => {
    if (!project._id) {
      throw new Error("project.id is undefined.");
    }

    setIsEditable(false);
    dispatch(
      updateProject({
        projectId: project._id,
        updatedData: { projectName, client, dueDate, status },
      })
    );
  };

  const onDelete = () => {
    //shouldn't be necessary, diagnose type issue after delete is functional.
    if (typeof project._id !== "string") {
      console.error("Project ID is not a string");
      return;
    }

    dispatch(deleteProject(project._id));
  };

  const handleDuplicate = () => {
    dispatch(duplicateProject(project));
  };

  return (
    <Card
      className={
        isEditable
          ? "flex flex-col w-fit z-10 border-4 border-double border-gray-400 outline-4 absolute"
          : "flex flex-col w-fit relative"
      }
    >
      <div className="relative flex justify-between items-center p-6">
        {!isEditable && (
          <Badge
            variant="secondary"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            {status}
          </Badge>
        )}
        <div className="flex flex-col space-y-1.5">
          {isEditable ? (
            <>
              <Label>Project Name</Label>
              <Input
                className="text-2xl font-semibold leading-none tracking-tight max-w-full overflow-hidden"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </>
          ) : (
            <CardTitle>{project.projectName}</CardTitle>
          )}
          {isEditable ? (
            <>
              <Label className="pt-6">Client</Label>
              <Input
                className="text-sm text-muted-foreground"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </>
          ) : (
            <CardDescription>{client}</CardDescription>
          )}
        </div>
      </div>

      {isEditable && (
        <div className="flex flex-col space-y-2 pt-3 pb-3 pl-6 pr-6">
          <Label>Status</Label>
          <StatusTabs
            value={isEditable ? status : project.status}
            isEditable={isEditable} // pass isEditable state as prop for conditional tab rending in component
            onChange={setStatus}
          />
        </div>
      )}

      <div
        className={
          isEditable
            ? "flex flex-col space-y-2 p-6"
            : "pt-3 pb-6 pl-6 pr-6 flex justify-center"
        }
      >
        {isEditable ? (
          <>
            <Label>Due</Label>
            <DueDatePicker selected={dateObject} onChange={setDueDate} />
            <div className="flex flex-col mt-6 ">
              <Label className="text-muted-foreground pt-6">
                * Tasks are only editable on the tasks page.
              </Label>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <span className=" font-semibold leading-none tracking-tight">
              Due{" "}
            </span>
            <span className="text-muted-foreground">
              {new Date(dueDate).toDateString()}
            </span>
            <span className="mx-1">•</span>
            <span className=" font-semibold leading-none tracking-tight mx-1">
              {/* Placeholder for {project.tasks.length} until added to project objects */}
              17
            </span>
            <span className="text-muted-foreground">Tasks Remaining</span>
          </div>
        )}
      </div>

      <div className="flex space-x-4 p-6">
        {isEditable ? (
          <Button variant="outline" onClick={handleSave}>
            <LucideSave className="mr-2 h-4 w-4" />
            Save
          </Button>
        ) : (
          <Button variant="outline" onClick={handleEditToggle}>
            <LucideEdit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}

        {!isEditable && (
          <Button variant="outline" onClick={handleDuplicate}>
            <LucideCopyPlus className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
        )}

        {!isEditable && (
          <DeletionAlertDialog
            button={
              <Button variant="outline">
                <LucideTrash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            }
            alertDialogTitle={`Are you sure you want to delete this project`}
            alertDialogDescription={`If you delete ${project.projectName}, it cannot be undone.`}
            alertDialogAction="Delete"
            onDelete={onDelete}
          ></DeletionAlertDialog>
        )}
      </div>
    </Card>
  );
}
