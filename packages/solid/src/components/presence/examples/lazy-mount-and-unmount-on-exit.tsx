import { Presence } from '@ark-ui/solid/presence'
import { createSignal } from 'solid-js'

export const LazyMountAndUnmountOnExit = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <>
      <button type="button" onClick={() => setPresent(!present())}>
        Toggle
      </button>
      <Presence present={present()} lazyMount unmountOnExit>
        Lazy Mount and Unmounted on Exit
      </Presence>
    </>
  )
}
