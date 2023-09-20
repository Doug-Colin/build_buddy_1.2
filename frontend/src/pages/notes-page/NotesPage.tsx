import { TooltipProvider } from '@/components/plate-ui/tooltip'
import Editor from '@/pages/notes-page/plate/editor'
import Sidebar from './components/Sidebar'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import Layout from '@/components/Layout'

export default function NotesPage() {
  // !user redirects to LandingPage
  useAuthCheck()

  return (
    <Layout>
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          {/* <div className="flex max-w-[980px] flex-col items-start gap-2"> */}
            {/* text and buttons here */}
          {/* </div> */}
          <div className='flex w-full'>
            <div className='w-1/4 overflow-y-auto'><Sidebar/></div>
            <div className="w-3/4 rounded-lg border bg-background shadow">
              <Editor />
            </div>
          </div>
        </section>
      </TooltipProvider>
    </Layout>
  )
}
