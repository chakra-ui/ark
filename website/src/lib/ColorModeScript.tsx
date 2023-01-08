import { colorModeLocalStorageKey } from '@/lib/useColorMode'

/**
 * This script is used to set the color mode on the initial page load.
 * It runs before hydration and prevents a flash of maybe unwanted light mode.
 */
export const ColorModeScript = () => {
  const colorModeScript =
    // language=javascript
    `if (JSON.parse(window.localStorage.getItem('${colorModeLocalStorageKey}')) === 'dark') {
  document.documentElement.classList.add('dark')
}`
  return <script dangerouslySetInnerHTML={{ __html: colorModeScript }} />
}
