import { useState, useEffect } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea, Button } from "@/components/ui";
import StatusTabs from "@/pages/projects-page/components/StatusTabs";
import { DueDatePicker } from "@/pages/projects-page/components/DueDatePicker";
import { Project } from "@/features/projects/projectService";
import { useAppDispatch } from "@/app/hooks";
import { updateProject } from "@/features/projects/projectSlice";

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
    setIsEditable(false);
    dispatch(
      updateProject({
        projectId: project._id,
        updatedData: { projectName, client, dueDate, status },
      })
    );
  };

  return (
    <Card className="flex flex-col w-fit">
      <div className="relative flex justify-between items-center p-6">
        <div className="flex flex-col space-y-1.5">
          {isEditable ? (
            <Textarea
              className="text-2xl font-semibold leading-none tracking-tight"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          ) : (
            <CardTitle>{project.projectName}</CardTitle>
          )}
          {isEditable ? (
            <Textarea
              className="text-sm text-muted-foreground"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          ) : (
            <CardDescription>{client}</CardDescription>
          )}
        </div>
        <Button
          variant="secondary"
          className="absolute top-6 right-6"
          onClick={isEditable ? handleSave : handleEditToggle}
        >
          {isEditable ? "Save" : "Edit"}
        </Button>
      </div>
      <div className="flex flex-col space-y-2 pt-3 pb-3 pl-6 pr-6">
        <StatusTabs
          value={isEditable ? status : project.status}
          onChange={setStatus}
        />
      </div>
      <div
        className={
          isEditable ? "p-6" : "pt-3 pb-6 pl-6 pr-6 flex justify-center"
        }
      >
        {isEditable ? (
          <>
            <DueDatePicker selected={dueDate} onChange={setDueDate} />
            <div className="flex flex-col mt-6">
              <Label className="text-muted-foreground pb-1">
                Tasks can only be edited on the tasks page.
              </Label>
              <div className="flex items-center">
                <span className="font-semibold leading-none tracking-tight mx-1">
                  {/* Placeholder for {project.tasks.length} until added to project objects */}
                  17
                </span>
                <span className="text-muted-foreground">Tasks Remaining</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="font-semibold leading-none tracking-tight">
              Due{" "}
            </span>
            <span className="text-muted-foreground">
              {dueDate.toDateString()}
            </span>
            <span className="mx-1">•</span>
            <span className="font-semibold leading-none tracking-tight">
              {/* Placeholder for {project.tasks.length} until added to project objects */}
              17
            </span>
            <span className="text-muted-foreground">Tasks Remaining</span>
          </div>
        )}
      </div>
    </Card>
  );
}
