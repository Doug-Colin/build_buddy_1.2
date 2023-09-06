import Layout from "@/components/Layout";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { columns } from "@/pages/tasks-page/components/tasks-table/columns";
import { DataTable } from "@/pages/tasks-page/components/tasks-table/data-table";
import { useAppSelector } from "@/app/hooks";

export default function TasksPage() {
  // !user redirects to LandingPage
  useAuthCheck();

  const tasks = useAppSelector((state) => state.tasks.tasks);

  return (
    <Layout>
      <div className="">
        <DataTable columns={columns} data={tasks} />
      </div>
    </Layout>
  );
}
