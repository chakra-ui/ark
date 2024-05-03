'use client'
import { styled } from 'styled-system/jsx'

export const ColorModeButton = () => {
  const handleClick = () => {
    const element = document.documentElement
    element.classList.toggle('dark')
    const colorMode = element.classList.contains('dark') ? 'dark' : 'light'
    window.localStorage.setItem('ark-ui-color-mode', JSON.stringify(colorMode))
    window.dispatchEvent(
      new CustomEvent('colorModeChange', {
        detail: {
          colorMode,
        },
      }),
    )
  }

  return (
    // <IconButton variant="ghost" aria-label="Toggle Color Mode" onClick={handleClick}>
    <button type="button" aria-label="Toggle Color Mode" onClick={handleClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>Toggle Color Mode</title>
        <styled.circle
          cx="12"
          cy="12"
          r="4"
          fill="currentcolor"
          _dark={{ stroke: 'transparent', fill: 'transparent' }}
        />
        <styled.path d="M12 2v2" _dark={{ stroke: 'transparent' }} />
        <styled.path d="M12 20v2" _dark={{ stroke: 'transparent' }} />
        <styled.path d="m4.93 4.93 1.41 1.41" _dark={{ stroke: 'transparent' }} />
        <styled.path d="m17.66 17.66 1.41 1.41" _dark={{ stroke: 'transparent' }} />
        <styled.path d="M2 12h2" _dark={{ stroke: 'transparent' }} />
        <styled.path d="M20 12h2" _dark={{ stroke: 'transparent' }} />
        <styled.path d="m6.34 17.66-1.41 1.41" _dark={{ stroke: 'transparent' }} />
        <styled.path d="m19.07 4.93-1.41 1.41" _dark={{ stroke: 'transparent' }} />
        <styled.path
          stroke="transparent"
          _dark={{ stroke: 'white' }}
          d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
        />
      </svg>
    </button>
  )
}
