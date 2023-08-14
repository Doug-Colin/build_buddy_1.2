import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import Header from "@/components/Header";
import { MainNav } from "@/pages/dashboard-page/components/main-nav";
import { Search } from "@/pages/dashboard-page/components/search";
import { getProjects } from "@/features/projects/projectSlice";
import { Project } from "@/types/types";
import ProjectCard from "@/pages/projects-page/components/ProjectCard";
import { useFormDialogState } from "@/hooks/useFormDialogState";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import FormDialog from "@/components/FormDialog";
import ProjectForm from "./components/ProjectForm";


export default function ProjectsPage() {
  const dispatch = useAppDispatch()
  const { projects } = useAppSelector((state) => state.projects);
  const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false);

  // !user redirects to LandingPage
  useAuthCheck()

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <>
      <Header />

      <div className="hidden flex-col md:flex">
        
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-3" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 p-12">
          <div className="flex justify-between items-center mx-">
            <h1 className="text-4xl font-bold tracking-tight">Projects</h1>

            <FormDialog
              title="Create Project"
              description="Fill out the form to create a new project. Click save when you're done."
              isOpen={isFormDialogOpen}
              onFormSubmissionCloseDialog={handleFormDialogClose}
              formComponent={
                <ProjectForm onFormSubmit={handleFormDialogClose} />
              }
            />

          </div>
          <div className="flex flex-wrap">
            {projects.map((project: Project) => (
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                <ProjectCard key={project._id} project={project} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
