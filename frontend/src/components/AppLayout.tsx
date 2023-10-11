//Layout to centralize rendering of Header, MainNav, and Search on all feature pages

import Header from '@/components/Header'
import { MainNav } from '@/components/MainNav'
import { Search } from '@/components/Search'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <nav className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-3" />
            <search className="ml-auto flex items-center space-x-4">
              <Search />
            </search>
          </div>
        </div>
        {/* For applying global styling/layout rules to all children components, if necessary */}
        <main className="flex-1">{children}</main>
      </nav>
    </>
  )
}
