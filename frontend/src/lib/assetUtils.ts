
type Theme = 'light' | 'dark'

export function darkOrLightIconPath(featureName: string, theme: 'light' | 'dark'): string {
    return `@assets/${featureName}${theme.charAt(0).toUpperCase() + theme.slice(1)}Mode.svg`
}


/*
Note:
When we say that utility functions should not depend on the global state, we mean the functions themselves should not retrieve or directly interact with global state. They can, however, take parameters that might be derived from a global state when called.

The function above doesn't directly call useTheme(). Instead, you pass the theme as an argument to the function. The fact that the theme might come from a global state (through React Context in your application) when you call it function is okay.

Whereas the following version of this function would be 'impure' and not best practice: 
export function getFeatureIconPathImpure(featureName: string): string {
  const theme = useTheme();  // Directly calling a hook to get global state
  return `/path/to/icons/${featureName}${theme.charAt(0).toUpperCase() + theme.slice(1)}Mode.png`;
}
*/