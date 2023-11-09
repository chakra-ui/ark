import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Presence } from './'
import './presence.css'

type PresenceType = typeof Presence

const meta: Meta<PresenceType> = {
  title: 'Presence',
  component: Presence,
}

export default meta

export const Basic = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <>
      <button onClick={() => setPresent(!present())}>Toggle</button>
      <Presence present={present()}>Hidden and Hidden</Presence>
    </>
  )
}
export const LazyMount = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <>
      <button onClick={() => setPresent(!present())}>Toggle</button>
      <Presence present={present()} lazyMount>
        Unmounted and Hidden
      </Presence>
    </>
  )
}

export const UnmountOnExit = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <>
      <button onClick={() => setPresent(!present())}>Toggle</button>
      <Presence present={present()} unmountOnExit>
        Hidden and Unmounted on Exit
      </Presence>
    </>
  )
}

export const LazyMountAndUnmountOnExit = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <>
      <button onClick={() => setPresent(!present())}>Toggle</button>
      <Presence present={present()} lazyMount unmountOnExit>
        Lazy Mount and Unmounted on Exit
      </Presence>
    </>
  )
}
