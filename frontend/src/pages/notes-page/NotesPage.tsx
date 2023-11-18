import { useState, useEffect, useRef } from 'react'
import { TooltipProvider } from '@/components/plate-ui/tooltip'
import ModularEditor from './components/ModularEditor'
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
import { MyValue } from '@/types/plate-types'
import { updateNote } from '@/features/notes/noteSlice'

export default function NotesPage() {
  // Redirects to LandingPage upon invalid user credentials.
  useAuthCheck()

  // Redux global state for notes and currentNote
  const notes = useAppSelector((state) => state.notes.notes)
  const currentNote = useAppSelector((state) => state.notes.currentNote)
  const dispatch = useAppDispatch()

  // Placeholder text for editor.
  const placeholder = {
    key: 'placeholder',
    value: [
      {
        id: '1',
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
  }

  // State and useEffect for populating editor upon user selection of note from table.
  const editorRef = useRef<typeof ModularEditor | null>(null)
  const [initialValue, setInitialValue] = useState<MyValue>(placeholder.value)
  const [key, setKey] = useState(
    currentNote?.noteContent === null ? 'placeholder' : currentNote?._id,
  )

  useEffect(() => {
    if (currentNote?.noteContent === null) {
      setKey('placeholder')
      setInitialValue(placeholder.value)
    } else if (currentNote && typeof currentNote.noteContent === 'string') {
      const parsedContent = JSON.parse(currentNote.noteContent)
      setInitialValue(parsedContent)
      setKey(currentNote._id)
    } else {
      // Reset to placeholder or clear the editor when there's no current note
      setInitialValue(placeholder.value)
    }
  }, [currentNote])

  // FormDialog state.
  const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false)

  // Retrieve notes from backend on page load.
  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  // Handler for saving changes in note content.
  const saveContentChange = (newContent: MyValue) => {
    const updatedContent = { noteContent: JSON.stringify(newContent) }
    if (currentNote?._id) {
      console.log(
        `saveContentChange called, dispatching updateNote with arg key-values of noteId:${currentNote._id} and updatedNote: ${updatedContent}`,
      )

      dispatch(
        updateNote({
          noteId: currentNote._id,
          updatedNote: updatedContent,
        }),
      )
    }
  }

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
            <ModularEditor
              editorRef={editorRef}
              editorKey={key}
              initialContent={initialValue}
              onChange={saveContentChange}
            />
          </div>
          <NotesDataTable<Note, any> columns={columns} data={notes} />
        </section>
      </TooltipProvider>
    </Layout>
  )
}
