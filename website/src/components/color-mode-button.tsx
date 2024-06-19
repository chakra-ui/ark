'use client'
import { useIsClient } from '@uidotdev/usehooks'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Box } from 'styled-system/jsx'
import { IconButton } from './ui'

export const ColorModeButton = () => {
  const isClient = useIsClient()
  const { theme, setTheme } = useTheme()

  if (!isClient) return <Box width="9" height="9" />

  const handleClick = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <IconButton
      onClick={handleClick}
      variant="ghost"
      size={{ base: 'md', md: 'sm' }}
      css={{
        color: 'fg.muted',
        _hover: { color: 'fg.default' },
        '& svg': {
          width: '5',
          height: '5',
        },
      }}
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}
