import { useState } from 'react'
import { Transition, useTransition } from '.'

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
