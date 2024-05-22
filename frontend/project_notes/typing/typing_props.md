Lets say you have the following component, a layout used to show or hide your MainNav and search bar depending on if user is logged in or not.

You'd get TS flags on the children and showNav props for them having type 'any'.

### Determining how to type the props of this layout component:

1) Identify what types these props should be:

   - children: This is usually a React node or an array of React nodes.
   - showNav: This is a boolean that tells the component whether to show the navigation or not.
2) Choose typing method:

   - Create an interface or use a type alias for the props.
   - Interface is most commonly used and easily extendable.
3) Implement typing: write the TS code to enforce thse types.

   - use the interface keyword and name the type (LayoutProps)
   - after a space, in curly brackets, define each type
   - use the interface in the function declaration: <export default function Layout({ children, showNav }: LayoutProps) {...code of function}>
   - import anything used in the typing if necessary; in this case, ReactNode from React

// Layout.tsx

importHeaderfrom"@/components/Header";

import { MainNav } from"@/pages/dashboard-page/components/main-nav";

import { Search } from"@/pages/dashboard-page/components/search";

interface LayoutProps {
    children: ReactNode;
    showNav: boolean;
}

exportdefaultfunctionLayout({ children, showNav }: LayoutProps) {

  return (

    <>

    `<Header/>`

    {showNav && (

    <divclassName="border-b">

    <divclassName="flex h-16 items-center px-4">

    <MainNavclassName="mx-3"/>

    <divclassName="ml-auto flex items-center space-x-4">

    `<Search/>`

    `</div>`

    `</div>`

    `</div>`

    )}

    <divclassName="flex-1 space-y-4 p-8 pt-6">{children}`</div>`

    </>

  );

}
