import { NumberFlow } from '@ark-ui/react/number-flow'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export const Timing = () => {
  const [value, setValue] = useState(31_415)

  return (
    <div className={styles.Card}>
      <span className={styles.Label}>Downloads</span>
      <NumberFlow.Root
        value={value}
        stagger="60ms"
        spinTiming={{ duration: '1400ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        transformTiming={{ duration: '700ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        className={`${styles.Root} ${styles.Display}`}
      >
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <span className={styles.Caption}>A slower spring with each digit trailing the one before it.</span>
      <button type="button" className={button.Root} onClick={() => setValue(Math.round(Math.random() * 999_999))}>
        Randomize
      </button>
    </div>
  )
}
