import { Presence } from '@ark-ui/solid/presence'
import { createSignal } from 'solid-js'

export const Basic = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <>
      <button type="button" onClick={() => setPresent(!present())}>
        Toggle
      </button>
      <Presence present={present()}>Hidden and Hidden</Presence>
    </>
  )
}
