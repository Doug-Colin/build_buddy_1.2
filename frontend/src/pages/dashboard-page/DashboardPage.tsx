import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import AppLayout from '@/components/AppLayout'

export default function DashboardPage() {
  // !user redirects to LandingPage
  useAuthCheck()

  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          {/* <h3>Welcome, {user && user.name}</h3> */}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="">Projects</CardTitle>
              <CardDescription>
                active projects - add client, _ days/hours needed for
                completion, _ days until due. _ remaining tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {/* Placeholder for rows of entries */}
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>These are ongoing tasks.</CardDescription>
            </CardHeader>
            <CardContent>{/* Placeholder for rows of entries */}</CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Estimates</CardTitle>
              <CardDescription>These are notes.</CardDescription>
            </CardHeader>
            <CardContent>{/* Placeholder for rows of entries */}</CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="">Notes</CardTitle>
              <CardDescription>These are notes.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {/* Placeholder for rows of entries */}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
