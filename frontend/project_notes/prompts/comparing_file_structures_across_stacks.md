Thanks, that response was at least a little bit better. Let's try again, I know you can do better. If I don't figure this out I'm going to lose my job, then I'll lose my home, then I'll lose my family.

Let's think step by step.

-I am going to give you the file structure (which will be given towards the end of this prompt, directly preceded by an asterisk character) of the app called 'Jottings', which uses Next.js/Prism/React TS/shadcn components/PlateJS plugin system for Slate RTE.

-I am creating an app, and I want to add a 'Notes' feature, which will have similar functionality to 'Jottings', but uses the term "notes" instead of 'jottings', and uses the term 'note' instead of 'jot'.

-Consider thoroughly that my app, to which I want to add a 'Notes' feature, uses Mern/Vite/React TS/Redux Toolkit/React Router/shadcn components/PlateJS plugin system for Slate RTE/Axios.

-I am also going to give you the current file structure of my app (which will be given at the end of the prompt, directly preceded by an ampersand character), which does not yet have the folder and file structure for the notes feature, though it does have MVP versions of other features built.

-First, you will thoroughly review the file structure of the 'Jottings' app, taking into account exactly how the stack and tools/libraries used affect the file structure.

-Second, you will thoroughly review the file structure of the 'Jottings' app, taking into account exactly how the stack and tools/libraries used affect the file structure.

-Third, you will generate the file structure of my app, if it were to incorporate the functionality of the Jottings app, but accounting for the differences in file structure due to exactly how the stack and tools/libraries used differ between the apps.

-Be sure to explain, EXPLICITLY, each and every component that exists in the 'Jottings' app, that would not exist in the 'Notes' app, for any reason, and explain such reasons explicitly and in simple terms.

-Be sure to explain, in simple terms, what parts of the file structure would differ due to the use of dynamic routes in Next.js ([jotId]) and how detail pages can be structured, which would not occur in the 'Notes' app.

-Be sure to explain, in simple terms, how fetching data would work differenly in the 'Notes' App and the 'Jottings' app

-Be sure to explain, in simple terms, how the structure of props and state data flow would differ between the two apps, if it would.

Here is the 'Jottings' app filetree:

jottings/
┣ .contentlayer/
┃ ┣ .cache/
┃ ┃ ┗ v0.3.3/
┃ ┃ ┣ compiled-contentlayer-config-NGH6OHC3.mjs
┃ ┃ ┗ compiled-contentlayer-config-NGH6OHC3.mjs.map
┃ ┗ generated/
┃ ┣ index.d.ts
┃ ┗ types.d.ts
┣ .github/
┃ ┗ dependabot.yml
┣ actions/
┃ ┣ jots.ts
┃ ┗ jotTemplates.ts
┣ app/
┃ ┣ (auth)/
┃ ┃ ┣ login/
┃ ┃ ┃ ┗ page.tsx
┃ ┃ ┣ register/
┃ ┃ ┃ ┗ page.tsx
┃ ┃ ┗ layout.tsx
┃ ┣ (dashboard)/
┃ ┃ ┗ dashboard/
┃ ┃ ┣ layout.tsx
┃ ┃ ┣ loading.tsx
┃ ┃ ┗ page.tsx
┃ ┣ (jots)/
┃ ┃ ┗ jots/
┃ ┃ ┣ [jotId]/
┃ ┃ ┣ layout.tsx
┃ ┃ ┣ loading.tsx
┃ ┃ ┗ page.tsx
┃ ┣ (marketing)/
┃ ┃ ┣ changelog/
┃ ┃ ┃ ┣ [...slug]/
┃ ┃ ┃ ┗ page.tsx
┃ ┃ ┣ layout.tsx
┃ ┃ ┗ page.tsx
┃ ┣ (settings)/
┃ ┃ ┗ settings/
┃ ┃ ┣ layout.tsx
┃ ┃ ┣ loading.tsx
┃ ┃ ┗ page.tsx
┃ ┣ (templates)/
┃ ┃ ┗ templates/
┃ ┃ ┣ [templateId]/
┃ ┃ ┣ layout.tsx
┃ ┃ ┣ loading.tsx
┃ ┃ ┗ page.tsx
┃ ┣ api/
┃ ┃ ┣ auth/
┃ ┃ ┃ ┗ [...nextauth]/
┃ ┃ ┣ jots/
┃ ┃ ┃ ┣ [jotId]/
┃ ┃ ┃ ┗ route.ts
┃ ┃ ┣ jot_templates/
┃ ┃ ┃ ┣ [jotTemplateId]/
┃ ┃ ┃ ┗ route.ts
┃ ┃ ┣ labels/
┃ ┃ ┃ ┣ [labelId]/
┃ ┃ ┃ ┗ route.ts
┃ ┃ ┣ label_associations/
┃ ┃ ┃ ┣ [labelAssociationId]/
┃ ┃ ┃ ┗ route.ts
┃ ┃ ┗ users/
┃ ┃ ┗ [userId]/
┃ ┣ layout.tsx
┃ ┗ robots.ts
┣ assets/
┃ ┗ fonts/
┃ ┣ CalSans-SemiBold.ttf
┃ ┣ CalSans-SemiBold.woff
┃ ┣ CalSans-SemiBold.woff2
┃ ┣ Inter-Bold.ttf
┃ ┗ Inter-Regular.ttf
┣ components/
┃ ┣ jots/
┃ ┃ ┣ table/
┃ ┃ ┃ ┣ columns.tsx
┃ ┃ ┃ ┗ jot-table.tsx
┃ ┃ ┣ jot-create-button.tsx
┃ ┃ ┣ jot-details.tsx
┃ ┃ ┣ jot-header.tsx
┃ ┃ ┣ jot-item.tsx
┃ ┃ ┗ jot-operations.tsx
┃ ┣ landing/
┃ ┃ ┗ vertical-carousel-card.tsx
┃ ┣ plate/
┃ ┃ ┗ tabbable-element.tsx
┃ ┣ plate-ui/
┃ ┃ ┣ align-dropdown-menu.tsx
┃ ┃ ┣ avatar.tsx
┃ ┃ ┣ blockquote-element.tsx
┃ ┃ ┣ button.tsx
┃ ┃ ┣ caption.tsx
┃ ┃ ┣ checkbox.tsx
┃ ┃ ┣ code-block-combobox.tsx
┃ ┃ ┣ code-block-element.css
┃ ┃ ┣ code-block-element.tsx
┃ ┃ ┣ code-leaf.tsx
┃ ┃ ┣ code-line-element.tsx
┃ ┃ ┣ code-syntax-leaf.tsx
┃ ┃ ┣ color-constants.ts
┃ ┃ ┣ color-dropdown-menu-items.tsx
┃ ┃ ┣ color-dropdown-menu.tsx
┃ ┃ ┣ color-input.tsx
┃ ┃ ┣ color-picker.tsx
┃ ┃ ┣ colors-custom.tsx
┃ ┃ ┣ combobox.tsx
┃ ┃ ┣ command.tsx
┃ ┃ ┣ comment-avatar.tsx
┃ ┃ ┣ comment-create-form.tsx
┃ ┃ ┣ comment-item.tsx
┃ ┃ ┣ comment-leaf.tsx
┃ ┃ ┣ comment-more-dropdown.tsx
┃ ┃ ┣ comment-reply-items.tsx
┃ ┃ ┣ comment-resolve-button.tsx
┃ ┃ ┣ comment-toolbar-button.tsx
┃ ┃ ┣ comment-value.tsx
┃ ┃ ┣ comments-popover.tsx
┃ ┃ ┣ cursor-overlay.tsx
┃ ┃ ┣ dialog.tsx
┃ ┃ ┣ draggable.tsx
┃ ┃ ┣ dropdown-menu.tsx
┃ ┃ ┣ fixed-toolbar-buttons.tsx
┃ ┃ ┣ fixed-toolbar.tsx
┃ ┃ ┣ floating-toolbar-buttons.tsx
┃ ┃ ┣ floating-toolbar.tsx
┃ ┃ ┣ heading-element.tsx
┃ ┃ ┣ highlight-leaf.tsx
┃ ┃ ┣ hr-element.tsx
┃ ┃ ┣ image-element.tsx
┃ ┃ ┣ indent-list-toolbar-button.tsx
┃ ┃ ┣ indent-toolbar-button.tsx
┃ ┃ ┣ input.tsx
┃ ┃ ┣ insert-dropdown-menu.tsx
┃ ┃ ┣ kbd-leaf.tsx
┃ ┃ ┣ line-height-dropdown-menu.tsx
┃ ┃ ┣ link-element.tsx
┃ ┃ ┣ link-floating-toolbar.tsx
┃ ┃ ┣ link-toolbar-button.tsx
┃ ┃ ┣ list-element.tsx
┃ ┃ ┣ list-toolbar-button.tsx
┃ ┃ ┣ mark-toolbar-button.tsx
┃ ┃ ┣ media-embed-element.tsx
┃ ┃ ┣ media-popover.tsx
┃ ┃ ┣ media-toolbar-button.tsx
┃ ┃ ┣ mention-combobox.tsx
┃ ┃ ┣ mention-element.tsx
┃ ┃ ┣ mention-input-element.tsx
┃ ┃ ┣ more-dropdown-menu.tsx
┃ ┃ ┣ outdent-toolbar-button.tsx
┃ ┃ ┣ paragraph-element.tsx
┃ ┃ ┣ placeholder.tsx
┃ ┃ ┣ popover.tsx
┃ ┃ ┣ resizable.tsx
┃ ┃ ┣ search-highlight-leaf.tsx
┃ ┃ ┣ separator.tsx
┃ ┃ ┣ table-cell-element.tsx
┃ ┃ ┣ table-dropdown-menu.tsx
┃ ┃ ┣ table-element.tsx
┃ ┃ ┣ table-row-element.tsx
┃ ┃ ┣ todo-list-element.tsx
┃ ┃ ┣ toggle.tsx
┃ ┃ ┣ toolbar.tsx
┃ ┃ ┣ tooltip.tsx
┃ ┃ ┣ turn-into-dropdown-menu.tsx
┃ ┃ ┗ with-draggables.tsx
┃ ┣ table/
┃ ┃ ┣ data-table-column-header.tsx
┃ ┃ ┣ data-table-pagination.tsx
┃ ┃ ┣ data-table-toolbar.tsx
┃ ┃ ┣ data-table-view-options.tsx
┃ ┃ ┣ data-table.tsx
┃ ┃ ┗ table.tsx
┃ ┣ templates/
┃ ┃ ┣ table/
┃ ┃ ┃ ┣ columns.tsx
┃ ┃ ┃ ┗ template-table.tsx
┃ ┃ ┣ jot-template-create-button.tsx
┃ ┃ ┣ template-details.tsx
┃ ┃ ┣ template-header.tsx
┃ ┃ ┣ template-item.tsx
┃ ┃ ┗ template-operations.tsx
┃ ┣ ui/
┃ ┃ ┣ alert-dialog.tsx
┃ ┃ ┣ avatar.tsx
┃ ┃ ┣ badge.tsx
┃ ┃ ┣ breadcrumbs.tsx
┃ ┃ ┣ button.tsx
┃ ┃ ┣ card.tsx
┃ ┃ ┣ dropdown-menu.tsx
┃ ┃ ┣ input.tsx
┃ ┃ ┣ label.tsx
┃ ┃ ┣ popover.tsx
┃ ┃ ┣ select.tsx
┃ ┃ ┣ skeleton.tsx
┃ ┃ ┣ tabs.tsx
┃ ┃ ┣ textarea.tsx
┃ ┃ ┣ toast.tsx
┃ ┃ ┣ toaster.tsx
┃ ┃ ┗ use-toast.ts
┃ ┣ analytics.tsx
┃ ┣ callout.tsx
┃ ┣ card-skeleton.tsx
┃ ┣ document-editor.tsx
┃ ┣ empty-placeholder.tsx
┃ ┣ icons.tsx
┃ ┣ label-selection.tsx
┃ ┣ main-nav.tsx
┃ ┣ mdx-card.tsx
┃ ┣ mdx-components.tsx
┃ ┣ mobile-nav.tsx
┃ ┣ mode-toggle.tsx
┃ ┣ nav.tsx
┃ ┣ page-breadcrumbs.tsx
┃ ┣ page-header.tsx
┃ ┣ page-nav.tsx
┃ ┣ page-shell.tsx
┃ ┣ sidebar-nav.tsx
┃ ┣ site-footer.tsx
┃ ┣ theme-provider.tsx
┃ ┣ user-account-nav.tsx
┃ ┣ user-auth-form.tsx
┃ ┣ user-avatar.tsx
┃ ┗ user-name-form.tsx
┣ config/
┃ ┣ dashboard.ts
┃ ┣ marketing.ts
┃ ┗ site.ts
┣ content/
┃ ┣ authors/
┃ ┃ ┗ zaczajdel.mdx
┃ ┗ changelog/
┃ ┣ release-v1.1.0.mdx
┃ ┣ release-v1.2.0.mdx
┃ ┗ release-v1.3.0.mdx
┣ hooks/
┃ ┣ use-data-table.ts
┃ ┗ use-lock-body.ts
┣ lib/
┃ ┣ plate/
┃ ┃ ┣ autoformatBlocks.ts
┃ ┃ ┣ autoformatIndentLists.ts
┃ ┃ ┣ autoformatLists.ts
┃ ┃ ┣ autoformatMarks.ts
┃ ┃ ┣ autoformatPlugin.ts
┃ ┃ ┣ autoformatRules.ts
┃ ┃ ┣ autoformatUtils.ts
┃ ┃ ┣ comments.ts
┃ ┃ ┣ dragOverCursorPlugin.ts
┃ ┃ ┣ mentionables.ts
┃ ┃ ┗ plate-plugins.ts
┃ ┣ validations/
┃ ┃ ┣ auth.ts
┃ ┃ ┣ jot.ts
┃ ┃ ┗ user.ts
┃ ┣ auth.ts
┃ ┣ db.ts
┃ ┣ session.ts
┃ ┣ toc.ts
┃ ┗ utils.ts
┣ pages/
┃ ┗ api/
┃ ┗ auth/
┃ ┃ ┗ [...nextauth].ts
┣ prisma/
┃ ┣ migrations/
┃ ┃ ┣ 20230620045414_init/
┃ ┃ ┃ ┗ migration.sql
┃ ┃ ┣ 20230819235003_add_jot_templates_table/
┃ ┃ ┃ ┗ migration.sql
┃ ┃ ┣ 20230824065824_add_jot_metadata/
┃ ┃ ┃ ┗ migration.sql
┃ ┃ ┣ 20230918225151_add_labels_table/
┃ ┃ ┃ ┗ migration.sql
┃ ┃ ┗ migration_lock.toml
┃ ┗ schema.prisma
┣ public/
┃ ┣ images/
┃ ┃ ┣ avatars/
┃ ┃ ┃ ┗ zac.png
┃ ┃ ┣ changelog/
┃ ┃ ┃ ┗ copy-feature.png
┃ ┃ ┗ landing/
┃ ┃ ┣ jots-dark.png
┃ ┃ ┣ jots-light.png
┃ ┃ ┣ teams-dark.png
┃ ┃ ┣ teams-light.png
┃ ┃ ┣ templates-dark.png
┃ ┃ ┗ templates-light.png
┃ ┣ android-chrome-192x192.png
┃ ┣ android-chrome-512x512.png
┃ ┣ apple-touch-icon.png
┃ ┣ browserconfig.xml
┃ ┣ favicon-16x16.png
┃ ┣ favicon-32x32.png
┃ ┣ favicon.ico
┃ ┣ mstile-150x150.png
┃ ┣ safari-pinned-tab.svg
┃ ┣ site.webmanifest
┃ ┗ vercel.svg
┣ scripts/
┃ ┗ changelog.mjs
┣ styles/
┃ ┣ globals.css
┃ ┗ mdx.css
┣ types/
┃ ┣ index.d.ts
┃ ┣ next-auth.d.ts
┃ ┗ plate-types.ts
┣ .env.example
┣ .gitignore
┣ contentlayer.config.js
┣ env.mjs
┣ middleware.ts
┣ next.config.mjs
┣ postcss.config.js
┣ prettier.config.js
┣ README.md
┣ tailwind.config.js
┣ tsconfig.json
┗ yarn.lock
