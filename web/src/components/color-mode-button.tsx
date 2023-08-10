'use client'
import { Expand } from '@theme-toggles/react'
import '@theme-toggles/react/css/Expand.css'
import { css, cx } from 'styled-system/css'
import { button } from 'styled-system/recipes'
import { useIsClient } from 'usehooks-ts'
import { useColorMode } from '~/lib/use-color-mode'

export const ColorModeButton = () => {
  const { toggle, colorMode } = useColorMode()

  const isClient = useIsClient()
  if (!isClient) {
    return null
  }

  return (
    <Expand
      onToggle={toggle}
      toggled={colorMode === 'light'}
      className={cx(
        button({ variant: 'tertiary', size: 'sm' }),
        css({
          fontSize: 'xl',
          px: '0',
        }),
      )}
      data-scope="button"
      data-part="root"
    />
  )
}
