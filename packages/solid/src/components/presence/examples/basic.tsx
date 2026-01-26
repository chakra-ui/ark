import { Presence } from '@ark-ui/solid/presence'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/presence.module.css'

export const Basic = () => {
  const [present, setPresent] = createSignal(false)
  return (
    <div class="stack">
      <button class={button.Root} type="button" onClick={() => setPresent(!present())}>
        Toggle
      </button>
      <Presence class={styles.Box} present={present()}>
        Content
      </Presence>
    </div>
  )
}
