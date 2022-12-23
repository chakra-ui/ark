import { useEffectOnce, useLocalStorage, useUpdateEffect } from 'usehooks-ts'

type ColorMode = 'light' | 'dark'

export const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage<ColorMode>('ark-color-mode', 'light')

  const syncColorMode = () =>
    colorMode === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')

  useEffectOnce(syncColorMode)
  useUpdateEffect(syncColorMode, [colorMode])

  return {
    colorMode,
    toggle: () => setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
  }
}
