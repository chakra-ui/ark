import { Presence } from '@ark-ui/solid/presence'
import { createSignal } from 'solid-js'

export const LazyMount = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <>
      <button type="button" onClick={() => setPresent(!present())}>
        Toggle
      </button>
      <Presence present={present()} lazyMount>
        Unmounted and Hidden
      </Presence>
    </>
  )
}
