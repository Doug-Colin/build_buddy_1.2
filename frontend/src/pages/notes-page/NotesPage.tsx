import { TooltipProvider } from '@/components/plate-ui/tooltip'
import Editor from '@/pages/notes-page/components/editor'
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
import { useState, useEffect } from 'react'
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from '@/components/ui/resizable'

export default function NotesPage() {
  // !user redirects to LandingPage
  useAuthCheck()

  const dispatch = useAppDispatch()
  const notes = useAppSelector((state) => state.notes.notes)
  const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false)
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  //const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  const handleNoteSelection = (note: Note) => {
    setCurrentNote(note)
  }

  return (
    // <Layout>
    //   <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
    //     <div className="flex max-w-[980px] flex-col items-start gap-2">
    //       <FormDialog
    //         title="Create New Note"
    //         description="Fill out the form to create a new Note. Click save when you're done."
    //         isOpen={isFormDialogOpen}
    //         onFormSubmissionCloseDialog={handleFormDialogClose}
    //         formComponent={<NoteForm onFormSubmit={handleFormDialogClose} />}
    //       />
    //     </div>

    //     {/* <ResizablePanelGroup direction="vertical" className="h-full max-h-[800px] items-stretch">

    //       <ResizablePanel> */}
    //       <div className="flex h-full items-center justify-center p-6">
    //         <NotesDataTable<Note, any>
    //           columns={columns}
    //           data={notes}
    //           onNoteSelect={handleNoteSelection}
    //         />
    //         </div>
    //       {/* </ResizablePanel>
    //       <ResizableHandle withHandle />
    //       <ResizablePanel> */}
    //       {/* <div className="flex h-full items-center justify-center p-6"> */}
    //         <div className="max-w-[1336px] rounded-lg border bg-background shadow">
    //           <TooltipProvider
    //             disableHoverableContent
    //             delayDuration={500}
    //             skipDelayDuration={0}
    //           >
    //             <Editor />
    //           </TooltipProvider>
    //         </div>
    //         {/* </div> */}
    //       {/* </ResizablePanel>

    //     </ResizablePanelGroup> */}
    //   </section>
    // </Layout>

    <Layout>
    <TooltipProvider
      disableHoverableContent
      delayDuration={500}
      skipDelayDuration={0}
    >
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        {/* <div className="flex max-w-[980px] flex-col items-start gap-2"> */}
        <div className="flex-col items-start gap-2">
          <FormDialog
            title="Create Note"
            description="Fill out the form to create a new Note. Click save when you're done."
            isOpen={isFormDialogOpen}
            onFormSubmissionCloseDialog={handleFormDialogClose}
            formComponent={<NoteForm onFormSubmit={handleFormDialogClose} />}
          />
        </div>
        <div className="rounded-lg border bg-background shadow">
          <Editor />
        </div>
        <NotesDataTable<Note, any> columns={columns} data={notes} onNoteSelect={handleNoteSelection}/>
      </section>
    </TooltipProvider>
  </Layout>

  )
}
