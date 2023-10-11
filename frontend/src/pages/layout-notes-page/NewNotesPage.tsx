/* Equivalent to jottings/app/(jots)/jots/page.tsx
**Purpose** : The main page for displaying "Jots". It's an example of a feature page utilizing PageShell and PageHeader.

* **Best Practice** : Demonstrates how to structure a feature page using reusable components.
* **Data Flow** : Fetches data (jots) from the database and displays it using components like `JotTable`.
* **Layout/User Views** : Integrates `PageShell` and `PageHeader` for layout consistency, and uses `JotCreateButton` and `EmptyPlaceholder` for user interactions.


How it Works:

The page fetches data (jots) and displays them, possibly in a table format. It also includes breadcrumbs for navigation and a button to create new jots.
The PageShell and PageHeader components are used to ensure the page adheres to the app's standard layout and header structure.

Teaching Point:
Discuss how feature pages can be structured using generic layout components, making them consistent with the rest of the app.
*/

import { useAuthCheck } from '@/hooks/useAuthCheck'
// import { redirect } from "next/navigation"

import { PageHeader } from "@/components/PageHeader"
import { PageShell } from "@/components/PageShell"

import FormDialog from '@/components/FormDialog'
import { useFormDialogState } from '@/hooks/useFormDialogState'
import NoteForm from './components/NoteForm'
import { Note } from '@/types/types'
// import { JotTable } from "@/components/jots/table/jot-table"
import { NotesDataTable } from '@/pages/notes-page/components/table/NotesDataTable'
import { columns } from './components/table/columns'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { getNotes } from '@/features/notes/noteSlice'
import { useEffect } from 'react'

import AppLayout from '@/components/AppLayout'
import { TooltipProvider } from '@/components/plate-ui/tooltip'

// export const metadata = {
//   title: "Jots",
//   description: "Create and manage Jots.",
// }

export default function NewNotesPage () {
   // !user redirects to LandingPage
   useAuthCheck()

   const dispatch = useAppDispatch()
   const notes = useAppSelector((state) => state.notes.notes)
   const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false)


   useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  return (
    <AppLayout>
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >

    <PageShell className="gap-1">


      <PageHeader
        heading="Notes"
        text="Create and manage Notes."
      >
        <FormDialog
              title="Create Note"
              description="Fill out the form to create a new Note. Click save when you're done."
              isOpen={isFormDialogOpen}
              onFormSubmissionCloseDialog={handleFormDialogClose}
              formComponent={<NoteForm onFormSubmit={handleFormDialogClose} />}
            />
      </PageHeader>

      <div className="divide-y divide-border rounded-md mx-8 mb-12">
        <div className="space-y-4">

        {notes?.length ? (
          <NotesDataTable<Note, any> columns={columns} data={notes} />
        ) : (
          <h1>DERP</h1>
        )}
          {/* {jots?.length ? (
            <JotTable
              data={jots}
            />
          ) : (
            <EmptyPlaceholder className="mx-8">
              <EmptyPlaceholder.Icon name="file" />
              <EmptyPlaceholder.Title>No Jots created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any Jots yet. Start creating content.
              </EmptyPlaceholder.Description>
              <JotCreateButton />
            </EmptyPlaceholder>
          )} */}
        </div>
      </div>
    </PageShell>
     </TooltipProvider>
     </AppLayout>
  )
}