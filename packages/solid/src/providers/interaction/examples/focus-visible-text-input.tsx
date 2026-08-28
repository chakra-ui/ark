import { useFocusVisible } from '@ark-ui/solid/interaction'
import { createSignal } from 'solid-js'
import styles from 'styles/interaction.module.css'

export const FocusVisibleTextInput = () => {
  const isFocusVisible = useFocusVisible({ isTextInput: true })
  const [focusedField, setFocusedField] = createSignal<string | null>(null)

  return (
    <div class={styles.Container}>
      <p class={styles.Status}>Focus visible: {String(isFocusVisible())}</p>
      <div class={styles.Field}>
        <label class={styles.Label} for="first-name">
          First Name
        </label>
        <input
          id="first-name"
          type="text"
          class={styles.Input}
          data-focus-visible={focusedField() === 'first' && isFocusVisible() ? '' : undefined}
          onFocus={() => setFocusedField('first')}
          onBlur={() => setFocusedField(null)}
        />
      </div>
      <div class={styles.Field}>
        <label class={styles.Label} for="last-name">
          Last Name
        </label>
        <input
          id="last-name"
          type="text"
          class={styles.Input}
          data-focus-visible={focusedField() === 'last' && isFocusVisible() ? '' : undefined}
          onFocus={() => setFocusedField('last')}
          onBlur={() => setFocusedField(null)}
        />
      </div>
    </div>
  )
}
