'use client'
import { useColorMode } from '@/lib/useColorMode'
import { css, cx } from '@/panda/css'
import { button } from '@/panda/recipes'
import { Expand } from '@theme-toggles/react'
import '@theme-toggles/react/css/Expand.css'
import { useIsClient } from 'usehooks-ts'

export const ColorModeButton = () => {
  const { toggle, colorMode } = useColorMode()

  const isClient = useIsClient()
  // prevent false positive for server-side rendering
  if (!isClient) {
    return null
  }

  return (
    <Expand
      onToggle={toggle}
      toggled={colorMode === 'light'}
      className={cx(
        button({ variant: 'tertiary', size: 'md' }),
        css({
          fontSize: '2xl',
          px: '0',
          color: 'fg.emphasized',
          _hover: { bg: 'bg.subtle !important' },
        }),
      )}
      data-scope="button"
      data-part="root"
    />
  )
}
