'use client'
import { Swap } from '@ark-ui/react/swap'
import { Check, X } from 'lucide-react'
import { useState } from 'react'
import { css } from 'styled-system/css'

export const Demo = (props: Swap.RootProps) => {
  const [swapped, setSwapped] = useState(false)

  return (
    <button
      type="button"
      className={css({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '2',
        rounded: 'md',
        borderWidth: '1px',
        cursor: 'pointer',
        bg: 'transparent',
        color: 'fg.default',
        _hover: { bg: 'gray.2' },
      })}
      onClick={() => setSwapped((prev) => !prev)}
    >
      <Swap.Root swap={swapped} {...props}>
        <Swap.Indicator
          type="on"
          className={css({
            '&[data-state=open]': {
              animation: 'scale-in 200ms ease-out, fade-in 200ms ease-out',
            },
            '&[data-state=closed]': {
              animation: 'scale-out 100ms ease-in, fade-out 100ms ease-in',
            },
          })}
        >
          <Check />
        </Swap.Indicator>
        <Swap.Indicator
          type="off"
          className={css({
            '&[data-state=open]': {
              animation: 'scale-in 200ms ease-out, fade-in 200ms ease-out',
            },
            '&[data-state=closed]': {
              animation: 'scale-out 100ms ease-in, fade-out 100ms ease-in',
            },
          })}
        >
          <X />
        </Swap.Indicator>
      </Swap.Root>
    </button>
  )
}
