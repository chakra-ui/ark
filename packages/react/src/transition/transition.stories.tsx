import { useState } from 'react'
import { useTransition } from '.'

export const Basic = () => {
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
