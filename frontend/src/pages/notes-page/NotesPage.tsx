import { TooltipProvider } from '@/components/plate-ui/tooltip'
import { PlateEditor } from './components/PlateEditor'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import Layout from '@/components/Layout'
import FormDialog from '@/components/FormDialog'
import { useFormDialogState } from '@/hooks/useFormDialogState'
import NoteForm from './components/NoteForm'
import { NotesDataTable } from '@/pages/notes-page/components/table/NotesDataTable'
import { Note } from '@/types/types'
import { columns } from './components/table/columns'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { getNotes } from '@/features/notes/noteSlice'
import { useEffect } from 'react'

export default function PrevNotesPage() {
  // !user redirects to LandingPage
  useAuthCheck()

  const dispatch = useAppDispatch()

  // Redux global state for notes.
  const notes = useAppSelector((state) => state.notes.notes)

  // FormDialog state.
  const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false)

  // Retrieve notes from backend on page load.
  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

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
            <PlateEditor />
          </div>
          <NotesDataTable<Note, any> columns={columns} data={notes} />
        </section>
      </TooltipProvider>
    </Layout>
  )
}
