import { TooltipProvider } from '@/components/plate-ui/tooltip'
import Editor from '@/pages/notes-page/components/editor'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import Layout from '@/components/Layout'
import FormDialog from '@/components/FormDialog'
import { useFormDialogState } from '@/hooks/useFormDialogState'
import NoteForm from './components/NoteForm'

export default function NotesPage() {
  // !user redirects to LandingPage
  useAuthCheck()

  const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false)

  return (
    <Layout>
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <FormDialog
              title="Create Note"
              description="Fill out the form to create a new Note. Click save when you're done."
              isOpen={isFormDialogOpen}
              onFormSubmissionCloseDialog={handleFormDialogClose}
              formComponent={<NoteForm onFormSubmit={handleFormDialogClose} />}
            />
          </div>
          <div className="max-w-[1336px] rounded-lg border bg-background shadow">
            <Editor />
          </div>
        </section>
      </TooltipProvider>
    </Layout>
  )
}
