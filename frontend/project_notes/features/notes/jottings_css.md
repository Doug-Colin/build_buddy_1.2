**app/(jots)/jots/layout.tsx**

Renders MainNav, DashboardNav, UserAccountNav, and children of the main. 

**________________________________________________________________________________________________________________________________________**


****app/(jots)/jots/page.tsx****

Renders PageHeader,  JotCreateButton,  PageShell, PageBreadcrumbs, JotTable, EmptyPlaceholder

```
return (
    <PageShell className="gap-1">
      <PageBreadcrumbs crumbs={[
          {
            link: '/jots',
            title: 'Home',
            icon: 'home',
          },
          {
            link: '/jots',
            title: 'Jots',
          },
        ]}
      />

      <PageHeader
        heading="Jots"
        text="Create and manage Jots."
      >
        <JotCreateButton />
      </PageHeader>

      <div className="divide-y divide-border rounded-md mx-8 mb-12">
        <div className="space-y-4">
          {jots?.length ? (
            <JotTable
              data={jots}
            />
          ) : (
            <EmptyPlaceholder className="mx-8">
              <EmptyPlaceholder.Icon name="file" />
              <EmptyPlaceholder.Title>No Jots created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don't have any Jots yet. Start creating content.
              </EmptyPlaceholder.Description>
              <JotCreateButton />
            </EmptyPlaceholder>
          )}
        </div>
      </div>
    </PageShell>
  )
}
```

---

**app/(jots)/jots/[jotId]/page.tsx**

Renders JotDetails from "@/components/jots/jot-details"
Includes EditorPage props

```
return (
    <div>
      <JotDetails
        jot={{
          id: jot.id,
          title: jot.title,
          content: jot.content as MyValue,
          status: jot.status,
          priority: jot.priority,
          createdAt: jot.createdAt,
          published: jot.published,
          author: jot.author,
          labelAssociations: jot.labels,
        }}
      />
    </div>
  )
}
```

---

components/jots/jot-operations.tsx

Renders dropdown menus, alert dialog, icons for laoding states
