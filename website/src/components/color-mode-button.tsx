'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { css } from 'styled-system/css'
import { IconButton } from '~/components/ui/icon-button'

export const ColorModeButton = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <IconButton
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle color mode"
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
      <SunIcon className={css({ _dark: { display: 'none' } })} />
      <MoonIcon className={css({ display: 'none', _dark: { display: 'block' } })} />
    </IconButton>
  )
}
