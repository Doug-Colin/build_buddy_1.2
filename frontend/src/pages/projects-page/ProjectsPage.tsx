import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
// import and add Spinner for loading
import { reset } from "@/features/auth/authSlice";
import Header from "@/components/Header";
// import ProjectsForm from "@/pages/projects-page/components/ProjectsForm"
import { MainNav } from "@/pages/dashboard-page/components/main-nav";
import { Search } from "@/pages/dashboard-page/components/search";
import { Button, buttonVariants } from "@/components/ui";
import { getProjects } from "@/features/projects/projectSlice";
import { Project } from "@/features/projects/projectService";
import ProjectCard from "@/pages/projects-page/components/ProjectCard";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  // useAuthenticationCheck() // attempting to convert below user auth check into a hook
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);
  const { projects } = useAppSelector((state) => state.projects);

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

        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          </div>
          <Button
            //onClick={}
            className={buttonVariants({ variant: "outline" })}
          >
            New Project
          </Button>

          {projects.map((project: Project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}