Got a feature working and want to backdate the commits from there?

You may be able to backdate the commits there, and then they get copied to main, check into that.

If that doesnt work, one option is to:
-checkout the branch you want to push the changes from to main
-copy the filepaths of the changes you want to add
-checkout mainand

-run git checkout <other_branchname> `<path to file or folder>`, for ex  ``git checkout feature/notes_1 -- frontend/components.json``, and that file will be copied to main.

-run git push, or if backdating, `GIT_COMMITTER_DATE="2023-08-27 09:08:49" git commit -m "<message>" --date "2023-08-27 09:08:49"`

git commit -m "feat(feature): Short description" -m "Body: Detailed explanation."

Right now:
frontend/src/components/plate-ui  -m "feat(notes): Added minimum PlateUI components necessary for a rich text editor instance with basic editor functionality)"

frontend/src/pages/notes-page "feat(notes): Updated NotesPage.tsx to render `<Editor />` (must be wrapped in `<TooltipProvider />` in order to function properly)"

frontend/src/pages/notes-page -m "feat(notes): Add NotesPage.tsx, note editor" -m"Add notes-page dir,  add plate subdir, add NotesPage.tsx and render `<Editor />`  within (must be wrapped in `<TooltipProvider />` in order to function properly"

#### Copy the file from the feature branch and stage it for main:

`git checkout feature/notes_1 `

frontend/src/pages/notes-page/plate/editor.tsx

#### Amend the date and add an appropriate commit message:

GIT_COMMITTER_DATE="2023-08-30 08:06:29" git commit -m "feat(notes): Update App.tsx imports and Routes to render NotesPage.tsx with Editor.tsx child" --date "2023-08-30 08:06:29"
