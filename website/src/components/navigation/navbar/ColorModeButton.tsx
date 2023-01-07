'use client'
import { IconButton } from '@/components/shared/IconButton'
import { useColorMode } from '@/lib/useColorMode'
import { cx } from '@/panda/css'
import '@theme-toggles/react/css/Classic.css'
import { useEffect, useId, useState } from 'react'

export const ColorModeButton = () => {
  const idPrefix = useId()
  const { toggle, colorMode } = useColorMode()

  const [didRenderOnClient, setDidRenderOnClient] = useState(false)
  useEffect(() => {
    if (!didRenderOnClient) {
      setDidRenderOnClient(true)
    }
  }, [didRenderOnClient])

  // prevent false positive for server-side rendering
  if (!didRenderOnClient) return null

  const isToggled = didRenderOnClient && colorMode === 'light'
  const className = cx('theme-toggle', isToggled && 'theme-toggle--toggled')

  return (
    <IconButton
      variant="tertiary"
      className={className}
      _hover={{ bg: 'bg.subtle !important' }}
      size="md"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width="1.25em"
          height="1.25em"
          fill="currentColor"
          strokeLinecap="round"
          className="theme-toggle__classic"
          viewBox="0 0 32 32"
        >
          <clipPath id={`${idPrefix}theme-toggle__classic__cutout`}>
            <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
          </clipPath>
          <g clipPath={`url(#${idPrefix}theme-toggle__classic__cutout)`}>
            <circle cx={16} cy={16} r={9.34} />
            <g stroke="currentColor" strokeWidth={1.5}>
              <path d="M16 5.5v-4" />
              <path d="M16 30.5v-4" />
              <path d="M1.5 16h4" />
              <path d="M26.5 16h4" />
              <path d="m23.4 8.6 2.8-2.8" />
              <path d="m5.7 26.3 2.9-2.9" />
              <path d="m5.8 5.8 2.8 2.8" />
              <path d="m23.4 23.4 2.9 2.9" />
            </g>
          </g>
        </svg>
      }
      aria-label="Toggle color mode"
      onClick={toggle}
    />
  )
}
