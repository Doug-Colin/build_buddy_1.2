//---------- Tables with shadcn table and tanstack table ------------------------

//---------- page.tsx (server component) is where we'll fetch data and render our table. ------------------------

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { reset } from "@/features/auth/authSlice";
import Header from "@/components/Header";
import { MainNav } from "@/pages/dashboard-page/components/main-nav";
import { Search } from "@/pages/dashboard-page/components/search";
import {
  Task,
  columns,
} from "@/pages/tasks-page/components/tasks/columns";
import { DataTable } from "@/pages/tasks-page/components/tasks/data-table";


//mock function returns hardcoded array of Task object(s) 
const getData = async (): Promise<Task[]> => {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      projectName: 'Mission Desks',
      client: "Design Within Reach",
      taskName: "Source wood materials",
      label: "Sourcing",
      taskDescription: "Find and price out 10' x 4' quarter-sawn oak slabs",
      status: "In Progress",
      priority: "Medium"

    },
    // ...
  ];
};

export default function TasksPage() {
  const [data, setData] = useState<Task[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

//Auth
useEffect(() => {
  if (!user) {
    navigate("/login");
  }
  return () => {
    dispatch(reset());
  };
}, [user, navigate, dispatch]);

// table Data Fetching
useEffect(() => {
  getData().then((fetchedData) => setData(fetchedData));
}, []);

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
            <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          </div>

          <div className="">

            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
