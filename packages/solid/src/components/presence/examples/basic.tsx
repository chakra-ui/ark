import { createSignal } from 'solid-js'
import { Presence } from '../..'

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
