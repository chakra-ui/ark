import { Presence } from '@ark-ui/solid/presence'
import { createSignal } from 'solid-js'

export const SkipAnimationOnMount = () => {
  const [present, setPresent] = createSignal(true)

  return (
    <>
      <button type="button" onClick={() => setPresent(!present)}>
        Toggle
      </button>
      <Presence present={present()} skipAnimationOnMount>
        Content
      </Presence>
    </>
  )
}
