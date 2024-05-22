//jots page

<divclassName="divide-y divide-border rounded-md mx-8 mb-12">

    <divclassName="space-y-4">

    {jots?.length ? (

    <JotTable

    data={jots}

    />

    ) : (

    <EmptyPlaceholderclassName="mx-8">

    <EmptyPlaceholder.Iconname="file"/>

    <EmptyPlaceholder.Title>No Jots created</EmptyPlaceholder.Title>

    <EmptyPlaceholder.Description>

    You don&apos;t have any Jots yet. Start creating content.

    </EmptyPlaceholder.Description>

    `<JotCreateButton/>`

    `</EmptyPlaceholder>`

    )}

    `</div>`

    `</div>`

    `</PageShell>`

  )

}

// Jot ID component 'page'

return (

    `<div>`

    <JotDetails

    jot={{

    id:jot.id,

    title:jot.title,

    content:jot.contentasMyValue,

    status:jot.status,

    priority:jot.priority,

    createdAt:jot.createdAt,

    published:jot.published,

    author:jot.author,

    labelAssociations:jot.labels,

    }}

    />

    `</div>`

  )

}

//jots layout

return (

    <divclassName="relative flex min-h-screen h-screen overflow-hidden flex-col space-y-6 bg-core">

    <divclassName="grid flex-1 md:grid-cols-[215px_1fr] h-[1vh]">

    <asideclassName="hidden w-[215px] flex-col md:flex mb-3">

    <headerclassName="sticky top-0 z-40 px-2">

    <divclassName="flex h-14 items-center justify-between py-4 px-3">

    <MainNavitems={dashboardConfig.mainNav}/>

    `</div>`

    `</header>`

    <DashboardNavitems={dashboardConfig.sidebarNav}/>

    <divclassName="flex-1 px-2">`</div>`

    <divclassName="pl-2">

    <divclassName="w-full border rounded-xl">

    <UserAccountNav

    user={{

    name:user.name,

    image:user.image,

    email:user.email,

    }}

    />

    `</div>`

    `</div>`

    `</aside>`

    <mainclassName="flex flex-1 border rounded-xl bg-background m-3 flex-col overflow-scroll no-scrollbar">

    {children}

    `</main>`

    `</div>`

    `</div>`

  )

}

//JotItem imports and renders JotOperations

exportfunctionJotItem({ jot }:JotItemProps) {

    return (

    <divclassName="flex items-center justify-between p-4">

    <divclassName="grid gap-1">

    <Link

    href={`/jots/${jot.id}`}

    className="font-semibold hover:underline"

    >

    {jot.title}

    `</Link>`

    `<div>`

    <pclassName="text-sm text-muted-foreground">

    {formatDate(jot.createdAt?.toDateString())}

    `</p>`

    `</div>`

    `</div>`

    <JotOperationsjot={{ id:jot.id, title:jot.title }}/>

    `</div>`

    )

  }

  JotItem.Skeleton=functionJotItemSkeleton() {

    return (

    <divclassName="p-4">

    <divclassName="space-y-3">

    <SkeletonclassName="h-5 w-2/5"/>

    <SkeletonclassName="h-4 w-4/5"/>

    `</div>`

    `</div>`

    )

  }

  //JotOperations basically contains the operastions- ability to delete seems about it

  //JotHeader imports and renders PlateEditor, isEditorAltered fn from file document-editor.tsx., contains Save Logic, loading state for

  // PERHAPS LOOK INTO THIS FILE MORE TO UNDERSTAND THE SAVE LOGIC

  return (

    `<div>`

    <divclassName="mx-8 pt-6">

    `<div>`

    <h1

    className="mb-4 max-w-full whitespace-pre-wrap break-words text-4xl font-semibold outline-none"

    contentEditable="true"

    suppressContentEditableWarning={true}

    onInput={(e) =>

    setTitle((e.targetasHTMLDivElement).textContent ?? jot.title)

    }

    >

    {jot.title}

    `</h1>`

    `</div>`

    `<div>`

    <divclassName="w-100 flex pb-2.5">

    <divclassName="flex h-[34px] w-40 min-w-0 items-center text-sm leading-5">

    <Icons.userclassName="mr-2 h-4 w-4"/>

    <divclassName="overflow-hidden text-ellipsis whitespace-nowrap">

    Created by:

    `</div>`

    `</div>`

    <divclassName="h-100 flex min-w-0 flex-auto flex-col">

    <divclassName="h-100 ml-4 flex min-w-0 flex-auto items-center">

    <divclassName="w-100 relative inline-block min-h-[34px] overflow-hidden rounded-sm p-2 text-sm">

    <divclassName="flex h-[20px] min-w-0 flex-shrink-0 flex-wrap items-center">

    <UserAvatar

    user={{

    name:jot.author.name || null,

    image:jot.author.image || null,

    }}

    className="mr-2 h-5 w-5"

    />

    <divclassName="overflow-hidden text-ellipsis whitespace-nowrap">

    {jot.author.name}

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    <divclassName="w-100 flex pb-2.5">

    <divclassName="flex h-[34px] w-40 min-w-0 items-center text-sm leading-5">

    <Icons.calendarclassName="mr-2 h-4 w-4"/>

    <divclassName="overflow-hidden text-ellipsis whitespace-nowrap">

    Last Updated:

    `</div>`

    `</div>`

    <divclassName="h-100 flex min-w-0 flex-auto flex-col">

    <divclassName="h-100 ml-4 flex min-w-0 flex-auto items-center">

    <divclassName="w-100 relative inline-block min-h-[34px] overflow-hidden rounded-sm p-2 text-sm">

    <divclassName="flex h-[20px] min-w-0 flex-shrink-0 flex-wrap items-center">

    <divclassName="overflow-hidden text-ellipsis whitespace-nowrap">

    {formatDate(jot.createdAt?.toDateString())}

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    <divclassName="w-100 flex mb-5">

    <divclassName="flex h-[34px] w-40 min-w-0 items-center text-sm leading-5">

    <Icons.tagclassName="mr-2 h-4 w-4"/>

    <divclassName="overflow-hidden text-ellipsis whitespace-nowrap">

    Labels:

    `</div>`

    `</div>`

    <divclassName="h-100 flex min-w-0 flex-auto flex-col">

    <divclassName="h-100 ml-4 flex min-w-0 flex-auto items-center">

    <divclassName="w-100 relative inline-block min-h-[34px] overflow-hidden rounded-sm p-1 text-sm">

    <divclassName="flex min-w-0 flex-shrink-0 flex-wrap items-center">

    <divclassName="overflow-hidden text-ellipsis whitespace-nowrap">

    <divclassName="flex flex-wrap items-center">

    {jot.labelAssociations.length ?

    jot.labelAssociations.map((assoc) => (

    <span

    className="p-1"

    key={assoc.id}

    >

    <Badge

    color={assoc.label.color}

    removable

    onRemoved={() =>removeLabel(assoc)}

    >

    {assoc.label.name}

    `</Badge>`


    )) : null

    }

    <LabelSelection

    model="jots"

    modelId={jot.id}

    />

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    `</div>`

    `</div>`

  )

}

//components/jots/jot-details.tsx

//REnders document-editor, PlateEditor, JotHEader

interfaceJotProps {

    jot: {

    id:string

    title:string

    content:MyValue

    status:string

    priority:string|null

    createdAt:Date

    published:boolean

    author:User

    labelAssociations:LabelAssociations[]

    },

  }

  exportdefaultfunctionJotDetails({ jot }:JotProps) {

    consteditorRef=useRef`<PlateEditor>`(null);

    return (

    `<div>`

    `<RecoilRoot>`

    <JotHeader

    jot={jot}

    editorRef={editorRef}

    />

    <DocumentEditor

    editorRef={editorRef}

    content={{

    id:jot.id,

    title:jot.title,

    content:jot.contentasMyValue,

    createdAt:jot.createdAt,

    }}

    />

    `</RecoilRoot>`

    `</div>`

    );

  }

  //components/jots/table/columns.tsx

  "use client"

import { ColumnDef } from"@tanstack/react-table"

import { DataTableColumnHeader } from"../../table/data-table-column-header"

import { JotOperations } from"../jot-operations"

import { formatDate } from"@/lib/utils"

importLinkfrom"next/link"

exportconstcolumns:ColumnDef`<any>`[] = [

  {

    accessorKey:"title",

    header: ({ column }) => (

    <DataTableColumnHeader

    column={column}

    title="Title"

    />

    ),

    cell: ({ row }) => {

    return (

    <divclassName="flex items-center justify-between p-4">

    <divclassName="grid gap-1">

    <Link

    href={`/jots/${row.original.id}`}

    className="font-semibold hover:underline"

    >

    {row.getValue("title")}

    `</Link>`

    `<div>`

    <pclassName="text-sm text-muted-foreground">

    {formatDate(row.original.createdAt?.toDateString())}

    `</p>`

    `</div>`

    `</div>`

    `</div>`

    )

    },

    enableSorting:true,

  },

  {

    id:"actions",

    cell: ({ row }) => {

    return (

    <divclassName="flex items-center justify-end p-4 pr-8">

    <JotOperations

    jot={{

    id:row.original.id,

    title:row.original.title,

    }}

    />

    `</div>`

    )

    },

  },

]
