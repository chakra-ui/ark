'use client'
import { Frame } from '@ark-ui/react'
import { useTheme } from 'next-themes'
import { css } from 'styled-system/css'

export const Demo = () => {
  const { resolvedTheme } = useTheme()

  const color = resolvedTheme === 'dark' ? '#FFF' : '#000'
  const bg = resolvedTheme === 'dark' ? '#111110' : '#FFF'
  return (
    <Frame
      className={css({
        w: 'full',
        h: 'full',
        borderWidth: '1px',
        height: 'calc(var(--height) + 2px)',
      })}
      head={
        <style>{`.frame-root {font-family:sans-serif; padding: 24px} body{background: ${bg} }`}</style>
      }
    >
      <h1 style={{ color }}>Ark UI / Frame</h1>
      <p style={{ marginBottom: '10px', marginTop: '4px', color }}>
        This is a React component wrapped in an iframe.
      </p>
      <button style={{ padding: '5px' }}>Click me</button>
    </Frame>
  )
}
