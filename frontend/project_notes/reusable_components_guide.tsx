// Making React Components Reusable with Props using TypeScript and Tailwind
// To enhance the reusability of React components, avoid hardcoding styles directly into the component. Instead, pass them as props to allow for flexible styling based on different contexts.

// Example: Direct Styling
// In ThemeToggle.tsx:

export function ThemeToggle() {
  const { setTheme } = useTheme()
  return (
    <div className="absolute top-6 right-6">
      <DropdownMenu>{/* ...rest of the code */}</DropdownMenu>
    </div>
  )
}
// Recommended: Passing Styles via Props
// To allow flexible styling:

// Accept a className prop.
// Use TypeScript's type definitions to specify the component can accept any properties an HTML <div> element would.
// tsx:

export function ThemeToggle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { setTheme } = useTheme()
  return (
    <div className={className} {...props}>
      <DropdownMenu>{/* ...rest of the code */}</DropdownMenu>
    </div>
  )
}
// Then, style the component using className when it's used:

export default function LandingPageHeader() {
  return (
    <header>
      <ThemeToggle className="absolute top-6 right-6" />
      {/* ...other header code */}
    </header>
  )
}
// Note: With TypeScript, when you're using the <ThemeToggle /> component, press Ctrl+Space in VSCode, and it will suggest all available attributes for a <div> element, enhancing your development experience.
