import { Button } from '@/components/shared/Button'
import { css } from '@/panda/css'
import { Presence } from '@ark-ui/react'
import { useState } from 'react'

export const DemoPresence = () => {
  const [present, setPresent] = useState(false)
  return (
    <div>
      <Button onClick={() => setPresent(!present)}>Toggle</Button>
      <Presence present={present}>
        <div
          className={css({
            position: 'absolute',
            background: 'bg.canvas',
            borderRadius: 'md',
            borderWidth: '1px',
            boxShadow: 'lg',
            p: '4',
            mt: '2',
            '&[data-state=open]': { animation: 'fadeIn 0.25s ease-out' },
            '&[data-state=closed]': { animation: 'fadeOut 0.125s ease-in' },
          })}
        >
          I am an animated box
        </div>
      </Presence>
    </div>
  )
}
