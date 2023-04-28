import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Transition, useTransition } from '.'

type TransitionType = typeof Transition

const meta: Meta<TransitionType> = {
  title: 'Transition',
  component: Transition,
}

export default meta

export const WithHook = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { hidden, style } = useTransition({
    mounted: isOpen,
    enter: { opacity: 1, transform: 'translateY(0)' },
    exit: { opacity: 0, transform: 'translateY(2px)' },
  })

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle me</button>
      {!hidden && (
        <div
          style={{
            ...style,
            height: '40px',
            background: 'red',
          }}
        >
          Hello
        </div>
      )}
    </div>
  )
}

export const WithTransition = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle me</button>
      <Transition
        unmountOnExit
        mounted={isOpen}
        enter={{ opacity: 1, transform: 'translateY(0)' }}
        exit={{ opacity: 0, transform: 'translateY(10px)' }}
      >
        <div style={{ height: '40px', background: 'red' }}>Hello</div>
      </Transition>
    </div>
  )
}
