'use client'
import { Marquee, marqueeAnatomy } from '@ark-ui/react/marquee'
import { css, sva } from 'styled-system/css'

const technologies = [
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'Vue', icon: '💚', color: '#42B883' },
  { name: 'Svelte', icon: '🔥', color: '#FF3E00' },
  { name: 'Solid', icon: '💎', color: '#2C4F7C' },
  { name: 'TypeScript', icon: '📘', color: '#3178C6' },
  { name: 'JavaScript', icon: '⚡', color: '#F7DF1E' },
  { name: 'Ark UI', icon: '🦒', color: '#FFA500' },
  { name: 'Zag.js', icon: '⚙️', color: '#8B5CF6' },
]

export const Demo = () => {
  const classes = marqueeRecipe()
  return (
    <Marquee.Root spacing="2rem" className={classes.root} pauseOnInteraction>
      <Marquee.Edge side="start" className={classes.edge} />
      <Marquee.Viewport className={classes.viewport}>
        <Marquee.Content className={classes.content}>
          {technologies.map((tech, index) => (
            <Marquee.Item key={index} className={classes.item}>
              <span className={css({ fontSize: '2xl' })}>{tech.icon}</span>
              <span className={css({ fontWeight: 'medium', color: 'fg.default' })}>{tech.name}</span>
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
      <Marquee.Edge side="end" className={classes.edge} />
    </Marquee.Root>
  )
}

const marqueeRecipe = sva({
  slots: marqueeAnatomy.keys(),
  base: {
    root: {
      position: 'relative',
      '&[data-paused] *': {
        animationPlayState: 'paused !important',
      },
    },
    viewport: {
      overflow: 'hidden',
      display: 'flex',
    },
    content: {
      display: 'flex',
      minWidth: 'max-content',
      animationTimingFunction: 'linear',
      animationFillMode: 'forwards',
      animationDuration: 'var(--marquee-duration)',
      animationDelay: 'var(--marquee-delay)',
      animationIterationCount: 'var(--marquee-loop-count)',
      flexDirection: { _horizontal: 'row', _vertical: 'column' },
      '&[data-side="start"], &[data-side="end"]': {
        animationName: 'marqueeX',
      },
      '&[data-side="top"], &[data-side="bottom"]': {
        animationName: 'marqueeY',
      },
    },
    edge: {
      position: 'absolute',
      zIndex: 10,
      pointerEvents: 'none',
      '--edge-size': '20%',
      '--edge-color': 'colors.bg.default',
      '&[data-side="start"]': {
        width: 'var(--edge-size)',
        background: 'linear-gradient(to right, var(--edge-color), transparent)',
      },
      '&[data-side="end"]': {
        width: 'var(--edge-size)',
        background: 'linear-gradient(to left, var(--edge-color), transparent)',
      },
      '&[data-side="top"]': {
        height: 'var(--edge-size)',
        background: 'linear-gradient(to bottom, var(--edge-color), transparent)',
      },
      '&[data-side="bottom"]': {
        height: 'var(--edge-size)',
        background: 'linear-gradient(to top, var(--edge-color), transparent)',
      },
    },
    item: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2',
      px: '4',
      py: '3',
      borderRadius: 'lg',
      bg: 'bg.subtle',
      borderWidth: '1px',
      borderColor: 'border.default',
      minWidth: 'max-content',
      userSelect: 'none',
    },
  },
})
