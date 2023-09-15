//Layout to centralize rendering of Header, MainNav, and Search on all feature pages

import Header from '@/components/Header'
import { MainNav } from '@/components/MainNav'
import { Search } from '@/components/Search'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-3" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
            </div>
          </div>
        </div>
        {/* For applying global styling/layout rules to all children components, if necessary */}
        <div className="">{children}</div>
      </div>
    </>
  )
}
