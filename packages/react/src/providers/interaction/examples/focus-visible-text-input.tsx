import { useFocusVisible } from '@ark-ui/react/interaction'
import { useState } from 'react'
import styles from 'styles/interaction.module.css'

export const FocusVisibleTextInput = () => {
  const isFocusVisible = useFocusVisible({ isTextInput: true })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  return (
    <div className={styles.Container}>
      <p className={styles.Status}>Focus visible: {String(isFocusVisible)}</p>
      <div className={styles.Field}>
        <label className={styles.Label} htmlFor="first-name">
          First Name
        </label>
        <input
          id="first-name"
          type="text"
          className={styles.Input}
          data-focus-visible={focusedField === 'first' && isFocusVisible ? '' : undefined}
          onFocus={() => setFocusedField('first')}
          onBlur={() => setFocusedField(null)}
        />
      </div>
      <div className={styles.Field}>
        <label className={styles.Label} htmlFor="last-name">
          Last Name
        </label>
        <input
          id="last-name"
          type="text"
          className={styles.Input}
          data-focus-visible={focusedField === 'last' && isFocusVisible ? '' : undefined}
          onFocus={() => setFocusedField('last')}
          onBlur={() => setFocusedField(null)}
        />
      </div>
    </div>
  )
}
