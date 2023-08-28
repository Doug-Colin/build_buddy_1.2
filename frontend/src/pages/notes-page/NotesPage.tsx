import Header from "@/components/Header";
import { MainNav } from "@/pages/dashboard-page/components/main-nav";
import { Search } from "@/pages/dashboard-page/components/search";
import { TooltipProvider } from "@/components/plate-ui/tooltip";
import Editor from "./plate/editor";
import { useAuthCheck } from "@/hooks/useAuthCheck";


export default function ProjectsPage() {
 

  // !user redirects to LandingPage
  useAuthCheck()


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

        <TooltipProvider
            disableHoverableContent
            delayDuration={500}
            skipDelayDuration={0}
          >
            <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
              <div className="flex max-w-[980px] flex-col items-start gap-2">
                {/* Your text and buttons here */}
              </div>
              <div className="max-w-[1336px] rounded-lg border bg-background shadow">
                <Editor />
              </div>
            </section>
          </TooltipProvider>
          
       </div>

      
    </>
  );
}
