import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Presence } from './presence'
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
    <div>
      <button onClick={() => setPresent(!present())}>Toggle</button>
      <Presence present={present()}>
        <div class="box">Hidden and Hidden</div>
      </Presence>
    </div>
  )
}
export const LazyMount = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <div>
      <button onClick={() => setPresent(!present())}>Toggle</button>
      <Presence present={present()} lazyMount>
        <div class="box">Unmounted and Hidden</div>
      </Presence>
    </div>
  )
}

export const UnmountOnExit = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <div>
      <button onClick={() => setPresent(!present())}>Toggle</button>
      <Presence present={present()} unmountOnExit>
        <div class="box">Hidden and Unmounted on Exit</div>
      </Presence>
    </div>
  )
}

export const LazyMountAndUnmountOnExit = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <div>
      <button onClick={() => setPresent(!present())}>Toggle</button>
      <Presence present={present()} lazyMount unmountOnExit>
        <div class="box">Lazy Mount and Unmounted on Exit</div>
      </Presence>
    </div>
  )
}
