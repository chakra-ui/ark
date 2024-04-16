import { createSignal } from 'solid-js'
import { Presence } from '../..'

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
