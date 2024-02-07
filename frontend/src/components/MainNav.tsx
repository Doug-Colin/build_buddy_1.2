import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        to="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        to="/projects"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Projects
      </Link>
      <Link
        to="/tasks"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Tasks
      </Link>
      <Link
        to="/notes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Notes
      </Link>
      <Link
        to="/clients"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Clients
      </Link>
      {/* Following linksa were used for testing two primary responsive layouts/views */}
      {/* <Link
        to="/responsive-table-view"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        TableView
      </Link>
      <Link
        to="/responsive-item-detail-view"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        ItemView
      </Link> */}
    </nav>
  )
}
