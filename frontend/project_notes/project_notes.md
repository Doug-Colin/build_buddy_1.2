How to make a React component highly reusable via props:

For TS components, in this case shadcn, so using tailwind:
-you could simply add classname tailwind properties to a component for styling. however, if you want to reuse that component, this is not best practice. Imagine a component that will be reused througout the project, like a ThemeToggle for darkmode. You may need to space it differently for mobile, or other layouts, so the best approach to the styling would be to not style it directly in the component, but in the props of the original component.

KEY: You don't want to hardcode the css in the component itself. You want to provide the base component a prop

**For example, this is an excerpt from the ThemeToggle.tsx (mode-toggle from shadCN renamed to theme toggle), with direct styling:**

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="absolute top-6 right-6">
    <DropdownMenu>
        ...rest of shadcn code
    </DropdownMenu>
    </div>
  )
}

**But it would be advantageous if we could add the classname Tailwind styling into props like so:**

 export function ThemeToggle({className}) {
  const { setTheme } = useTheme()

  return (
    <div className={className}>
    <DropdownMenu>
        ...rest of shadcn code
    </DropdownMenu>
    </div>
  )
}

**Then, wherever you're using an instance of that component, you can style it however you want there by passing the styling as className props into the component wherever its rendered, For Example, if we're using our <ThemeToggle /> component in a <Header />, like so:**
export default function LandingPageHeader() {
    return (
        <header'>
                        <ThemeToggle className={'absolute top-6 right-6'}/>
        ...other header code.
        </header>
    )
}
**HOWEVER In order to actually accomplish this, we need to tell it what types of props to accept.**
**This can be done, in the following case, with the following syntax, like so:**
**The 'React.HTMLAttributes<HTMLDivElement>' here is dictating that this component will accept any props that an html <div> element would normally accept. NOTE: this is only possible because the return statement is wrapped in Div tags, otherwise you could do similar with different React.HTML Attributes & Elements.**
**Then we can destructure the className and normal props for this component, so that we can pass it className styling and the other props it normally accepts.**
**Then, in the <div> tag,we can specify/pass down the className prop, and then the other props via spread operator.**

export function ThemeToggle({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  const { setTheme } = useTheme()

  return (
    <div className={className} {...props}>
    <DropdownMenu>
        ...rest of shadcn code
    </DropdownMenu>
    </div>
  )
}

**By following the above, we can now pass the css Tailwind utility classes to the <ThemeToggle /> component whenever we render or reuse it:**
export default function LandingPageHeader() {
    return (
        <header'>
                        <ThemeToggle className={'absolute top-6 right-6'}/>
        ...other header code.
        </header>
    )
}

**NOTE: After achieving the above, you can now, wherever that component is being rendered, press Ctrl+space and you will see ALL the other props/attributes that are normally available to a Div element!! (believe this is a TS feature only though)**