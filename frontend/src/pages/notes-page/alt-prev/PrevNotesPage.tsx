import { TooltipProvider } from '@/components/plate-ui/tooltip'
import AltEditor from './alt-editor'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import Layout from '@/components/Layout'
import FormDialog from '@/components/FormDialog'
import { useFormDialogState } from '@/hooks/useFormDialogState'
import NoteForm from '../components/NoteForm'
import { NotesDataTable } from '@/pages/notes-page/components/table/NotesDataTable'
import { Note } from '@/types/types'
import { columns } from '../components/table/columns'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { getNotes, updateNote } from '@/features/notes/noteSlice'
import { useState, useEffect } from 'react'
import { useEditorRef } from '@udecode/plate-common'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export default function NotesPage() {
  

  // Redirect to LandingPage if user is invalid.
  useAuthCheck()

  // Redux global state & methods.
  const notes = useAppSelector((state) => state.notes.notes)
  const dispatch = useAppDispatch()
  const currentNote = useAppSelector((state) => state.notes.currentNote)
const currentNoteId = useAppSelector((state) => state.notes.currentNote?._id) 
const previousNoteContent = useAppSelector((state) => state.notes.currentNote?.noteContent) 
  if (currentNote !== null) {console.log(currentNote)}
  // FormDialog component state.
  const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false)

  
function handleCheckOfCurrentNote()  {
console.log(
  `The value of currentNote is now ${currentNote}
  
  The value of currentNote, after being passed into JSON.stringify, is now ${JSON.stringify(currentNote, null, 2)}

  The type of currentNote is now ${typeof currentNote}

  The value of currentNoteId is now ${currentNoteId}
  
  The value of previousNoteContent is now ${previousNoteContent}
  `)
  }

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  return (
    <Layout>
      <button onClick={handleCheckOfCurrentNote}>Check currentNote</button>
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">
              <NotesDataTable<Note, any> columns={columns} data={notes} />
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">
              <div className="flex max-w-[980px] flex-col items-start gap-2">
                <FormDialog
                  title="Create Note"
                  description="Fill out the form to create a new Note. Click save when you're done."
                  isOpen={isFormDialogOpen}
                  onFormSubmissionCloseDialog={handleFormDialogClose}
                  formComponent={
                    <NoteForm onFormSubmit={handleFormDialogClose} />
                  }
                />
              </div>
              <div className="max-w-[1336px] rounded-lg border bg-background shadow">
                <TooltipProvider
                  disableHoverableContent
                  delayDuration={500}
                  skipDelayDuration={0}
                >
                  {/* <Editor content={}/> */}
                  {/* {currentNote && <Editor content={currentNote.noteContent}/> } */}
                  <AltEditor
                    currentNoteId={currentNoteId}
                    previousNoteContent={previousNoteContent}
                  />
                </TooltipProvider>
              </div>
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Layout>
  )
}
