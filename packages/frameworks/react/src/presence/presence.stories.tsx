import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Presence } from './'
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
      <Presence.Root present={present}>
        <div className="box">Hidden and Hidden</div>
      </Presence.Root>
    </div>
  )
}

export const LazyMount = () => {
  const [present, setPresent] = useState(false)
  return (
    <div>
      <button onClick={() => setPresent(!present)}>Toggle</button>
      <Presence.Root present={present} lazyMount>
        <div className="box">Unmounted and Hidden</div>
      </Presence.Root>
    </div>
  )
}

export const UnmountOnExit = () => {
  const [present, setPresent] = useState(false)
  return (
    <div>
      <button onClick={() => setPresent(!present)}>Toggle</button>
      <Presence.Root present={present} unmountOnExit>
        <div className="box">Hidden and Unmounted on Exit</div>
      </Presence.Root>
    </div>
  )
}

export const LazyMountAndUnmountOnExit = () => {
  const [present, setPresent] = useState(false)
  return (
    <div>
      <button onClick={() => setPresent(!present)}>Toggle</button>
      <Presence.Root present={present} lazyMount unmountOnExit>
        <div className="box">Lazy Mount and Unmounted on Exit</div>
      </Presence.Root>
    </div>
  )
}
