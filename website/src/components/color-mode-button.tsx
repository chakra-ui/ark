'use client'
import { useIsClient } from '@uidotdev/usehooks'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { IconButton } from './ui'

export const ColorModeButton = () => {
  const isClient = useIsClient()
  const { theme, setTheme } = useTheme()

  if (!isClient) return null

  const handleClick = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <IconButton onClick={handleClick} variant="link" color="fg.muted" width="8">
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}
