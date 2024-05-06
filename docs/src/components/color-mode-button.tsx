'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { IconButton } from './ui'

export const ColorModeButton = () => {
  const { theme, setTheme } = useTheme()

  const handleClick = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <IconButton onClick={handleClick} variant="ghost">
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}
