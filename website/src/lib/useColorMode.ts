import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useMediaQuery, useUpdateEffect } from 'usehooks-ts'

type ColorMode = 'light' | 'dark'

export type UseColorModeProps = {
  defaultValue?: ColorMode
}

export const useColorMode = (props: UseColorModeProps) => {
  const { defaultValue } = props
  const isDarkOS = useMediaQuery('(prefers-color-scheme: dark)')
  const [colorMode, setColorMode] = useState<ColorMode>(defaultValue)
  const [_, setCookie] = useCookies(['colorMode'])

  useUpdateEffect(() => {
    setColorMode(syncColorMode(isDarkOS ? 'dark' : 'light'))
  }, [isDarkOS])

  const toggle = () => {
    setColorMode((prev) => syncColorMode(prev === 'dark' ? 'light' : 'dark'))
  }

  const syncColorMode = (colorMode: ColorMode) => {
    setCookie('colorMode', colorMode, { path: '/', sameSite: 'strict' })
    colorMode === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
    return colorMode
  }

  return {
    colorMode,
    toggle,
  }
}
