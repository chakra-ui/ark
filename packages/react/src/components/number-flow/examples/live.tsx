import { NumberFlow } from '@ark-ui/react/number-flow'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export const Live = () => {
  const [value, setValue] = useState(3)

  return (
    <div className={styles.Card}>
      <span className={styles.Label}>Items in cart</span>
      <NumberFlow.Root value={value} live={true} className={`${styles.Root} ${styles.Display}`}>
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <span className={styles.Caption}>Screen readers announce the count once it settles.</span>
      <div className={styles.Actions}>
        <button type="button" className={button.Root} onClick={() => setValue((v) => Math.max(0, v - 1))}>
          Remove item
        </button>
        <button type="button" className={button.Root} data-variant="solid" onClick={() => setValue((v) => v + 1)}>
          Add item
        </button>
      </div>
    </div>
  )
}
