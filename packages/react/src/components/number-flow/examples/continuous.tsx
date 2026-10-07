import { NumberFlow } from '@ark-ui/react/number-flow'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export const Continuous = () => {
  const [value, setValue] = useState(120)

  return (
    <div className={styles.Card}>
      <span className={styles.Label}>Points</span>
      <NumberFlow.Root value={value} continuous={true} className={`${styles.Root} ${styles.Display}`}>
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <span className={styles.Caption}>Every digit spins through the values in between.</span>
      <div className={styles.Actions}>
        <button type="button" className={button.Root} onClick={() => setValue((v) => v + 12)}>
          +12
        </button>
        <button type="button" className={button.Root} onClick={() => setValue((v) => v + 125)}>
          +125
        </button>
        <button type="button" className={button.Root} onClick={() => setValue(120)}>
          Reset
        </button>
      </div>
    </div>
  )
}
