type Theme = 'light' | 'dark'

export function darkOrLightIconPath(featureName: string, theme: 'light' | 'dark'): string {
    return `@assets/${featureName}${theme.charAt(0).toUpperCase() + theme.slice(1)}Mode.svg`
}
