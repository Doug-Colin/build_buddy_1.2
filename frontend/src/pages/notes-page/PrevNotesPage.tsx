import { TooltipProvider } from '@/components/plate-ui/tooltip'
import { PlateEditor } from './components/PlateEditor'
// import PreviousEditor from './prev-editor'
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
import { Plate } from '@udecode/plate-common'

export default function PrevNotesPage() {
  // !user redirects to LandingPage
  useAuthCheck()

  const dispatch = useAppDispatch()
  const notes = useAppSelector((state) => state.notes.notes)
  const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false)

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
          {/* <div className="container mx-auto p-4"> */}
          {/* <div className="max-w-[1336px] rounded-lg border bg-background shadow">
            <PreviousEditor /> */}
            <PlateEditor />
            <NotesDataTable<Note, any> columns={columns} data={notes} />
          {/* </div> */}
        </section>
      </TooltipProvider>
    </Layout>
  )
}
