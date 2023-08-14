
import { useEffect } from "react";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import Header from "@/components/Header";
import { MainNav } from "@/pages/dashboard-page/components/main-nav";
import { Search } from "@/pages/dashboard-page/components/search";
import { columns } from "@/pages/tasks-page/components/tasks-table/columns";
import { DataTable } from "@/pages/tasks-page/components/tasks-table/data-table";
import { getTasks } from "@/features/tasks/taskSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

export default function TasksPage() {
  useAuthCheck();
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks.tasks) 


  useEffect(() => {
    dispatch(getTasks());
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

        <div className="">
             <DataTable columns={columns} data={tasks} />
          </div>
      </div>
    </>
  );
}