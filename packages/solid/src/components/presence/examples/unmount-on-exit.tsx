import { Presence } from '@ark-ui/solid/presence'
import { createSignal } from 'solid-js'

export const UnmountOnExit = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <>
      <button type="button" onClick={() => setPresent(!present())}>
        Toggle
      </button>
      <Presence present={present()} unmountOnExit>
        Hidden and Unmounted on Exit
      </Presence>
    </>
  )
}
