import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Presence } from './presence'
import './presence.css'

type PresenceType = typeof Presence

const meta: Meta<PresenceType> = {
  title: 'Presence',
  component: Presence,
}

export default meta

export const Basic = () => {
  const [present, setPresent] = useState(false)
  return (
    <div>
      <button onClick={() => setPresent(!present)}>Toggle</button>
      <Presence present={present}>
        <span>I am a red box</span>
      </Presence>
    </div>
  )
}
