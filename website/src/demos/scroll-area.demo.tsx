'use client'
import { ScrollArea, scrollAreaAnatomy } from '@ark-ui/react/scroll-area'
import { sva } from 'styled-system/css'
import { center } from 'styled-system/patterns'

export const Demo = () => {
  const classes = scrollArea()
  return (
    <ScrollArea.Root className={classes.root}>
      <ScrollArea.Viewport className={classes.viewport}>
        <ScrollArea.Content className={classes.content}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={center({ height: '100px', bg: 'bg.subtle' })}>
              Item {index + 1}
            </div>
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className={classes.scrollbar}>
        <ScrollArea.Thumb className={classes.thumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={classes.corner} />
    </ScrollArea.Root>
  )
}

const scrollArea = sva({
  className: 'scrollArea',
  slots: scrollAreaAnatomy.keys(),
  base: {
    root: {
      boxSizing: 'border-box',
      width: '24rem',
      height: '12rem',
      maxWidth: 'calc(100vw - 8rem)',
    },
    viewport: {
      height: '100%',
      borderRadius: 'l1',
      borderWidth: '1px',
      scrollbarWidth: 'none',
      overscrollBehavior: 'contain',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
    },
    scrollbar: {
      display: 'flex',
      justifyContent: 'center',
      bg: 'bg.muted',
      '--scrollbar-size': '0.25rem',
      '--scrollbar-margin': '0.25rem',
      '--scrollbar-area': 'calc(var(--scrollbar-size) + calc(var(--scrollbar-margin) * 2))', // 1.25rem
      width: 'var(--scrollbar-size)',
      borderRadius: 'l2',
      margin: 'var(--scrollbar-margin)',
      opacity: '0',
      transition: 'opacity 150ms 300ms',
      position: 'relative',

      '&[data-hover], &[data-scrolling]': {
        opacity: '1',
        transitionDuration: '75ms',
        transitionDelay: '0ms',
      },

      _before: {
        content: '""',
        position: 'absolute',
        width: 'var(--scrollbar-area)',
        height: '100%',
      },
    },
    thumb: {
      width: '100%',
      borderRadius: 'inherit',
      bg: 'colorPalette.9',
    },
    corner: {
      bg: 'bg.subtle',
    },
  },
})
