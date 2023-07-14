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
        <span>Hidden and Hidden</span>
      </Presence>
    </div>
  )
}

export const LazyMount = () => {
  const [present, setPresent] = useState(false)
  return (
    <div>
      <button onClick={() => setPresent(!present)}>Toggle</button>
      <Presence present={present} lazyMount>
        <span>Unmounted and Hidden</span>
      </Presence>
    </div>
  )
}

export const UnmountOnExit = () => {
  const [present, setPresent] = useState(false)
  return (
    <div>
      <button onClick={() => setPresent(!present)}>Toggle</button>
      <Presence present={present} unmountOnExit>
        <span>Hidden and Unmounted on Exit</span>
      </Presence>
    </div>
  )
}

export const LazyMountAndUnmountOnExit = () => {
  const [present, setPresent] = useState(false)
  return (
    <div>
      <button onClick={() => setPresent(!present)}>Toggle</button>
      <Presence present={present} lazyMount unmountOnExit>
        <span>Lazy Mount and Unmounted on Exit</span>
      </Presence>
    </div>
  )
}
