import { useFocusVisible } from '@ark-ui/solid/interaction'
import { createSignal } from 'solid-js'
import styles from 'styles/interaction.module.css'

export const FocusVisible = () => {
  const isFocusVisible = useFocusVisible()
  const [focused, setFocused] = createSignal(false)

  return (
    <div class={styles.Container}>
      <p class={styles.Status}>Focus visible: {String(isFocusVisible())}</p>
      <button
        type="button"
        class={styles.Button}
        data-focus-visible={focused() && isFocusVisible() ? '' : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        Tab or click me
      </button>
    </div>
  )
}
