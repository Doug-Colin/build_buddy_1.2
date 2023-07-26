import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
// import and add Spinner for loading
import { reset } from "@/features/auth/authSlice";
import Header from "@/components/Header";
// import ProjectsForm from "@/pages/projects-page/components/ProjectsForm"
import { MainNav } from "@/pages/dashboard-page/components/main-nav";
import { Search } from "@/pages/dashboard-page/components/search";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects } from "@/features/projects/projectSlice";
import { Project } from "@/features/projects/projectService";


function ProjectsPage() {
  const dispatch = useAppDispatch();
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
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                + New Project
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                List of all projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projects.map((project: Project) => (
                <div key={project._id} className="flex justify-between p-2 border-b">
                  <span>{project.title}</span>
                  <span>{project.status}</span>
                  {/* Add other project details as needed */}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;

// --------------------------------------- Old Attempt ------------------------------------
// export default function ProjectsPage() {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const { user } = useAppSelector((state) => state.auth);

//   // useAuthenticationCheck() // attempting to conver below user auth check into a hook

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//     return () => {
//       dispatch(reset());
//     };
//   }, [user, navigate, dispatch]);

//   return (
//     <>
//       <Header />
//       <div className="hidden flex-col md:flex">
//         <div className="border-b">
//           <div className="flex h-16 items-center px-4">
//             {/* Links to features */}
//             <MainNav className="mx-3" />
//             <div className="ml-auto flex items-center space-x-4">
//               <Search />
//             </div>
//           </div>
//         </div>
//         </div>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle className="">Projects</CardTitle>
//                 <CardDescription>
//                   active projects - add client, _ days/hours needed for
//                   completion, _ days until due. _ remaining tasks
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="pl-2">
//                 {/* Placeholder for rows of entries */}
//               </CardContent>
//             </Card>
//         </div>
//         {/* <ProjectsForm /> */}
//     </>
//   );
// }
