import { useAuthCheck } from '@/hooks/useAuthCheck'
import Layout from '@/components/Layout'
import Editor from '@/pages/notes-page/components/Editor'



export default function ProjectsPage() {
  // !user redirects to LandingPage
  useAuthCheck()

  

  return (
    <Layout>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          {/* text and buttons here */}
        </div>
        <div className="max-w-[1336px] rounded-lg border bg-background shadow">
         <Editor />
        </div>
      </section>
    </Layout>
  )
}
