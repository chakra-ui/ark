import { useFocusVisible } from '@ark-ui/react/interaction'
import { useState } from 'react'
import styles from 'styles/interaction.module.css'

export const FocusVisible = () => {
  const isFocusVisible = useFocusVisible()
  const [focused, setFocused] = useState(false)

  return (
    <div className={styles.Container}>
      <p className={styles.Status}>Focus visible: {String(isFocusVisible)}</p>
      <button
        type="button"
        className={styles.Button}
        data-focus-visible={focused && isFocusVisible ? '' : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        Tab or click me
      </button>
    </div>
  )
}
