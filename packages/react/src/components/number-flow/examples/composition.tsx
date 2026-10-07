import { NumberFlow } from '@ark-ui/react/number-flow'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export const Composition = () => {
  const [value, setValue] = useState(1299.99)

  return (
    <div className={styles.Card}>
      <span className={styles.Label}>Total due</span>
      <NumberFlow.Root
        value={value}
        formatOptions={{ style: 'currency', currency: 'USD' }}
        className={`${styles.Root} ${styles.Display}`}
      >
        <NumberFlow.Segments>
          {(segment) =>
            segment.kind === 'digit' ? (
              <NumberFlow.Digit segment={segment} className={segment.place < 0 ? styles.Fraction : undefined} />
            ) : (
              <NumberFlow.Symbol
                segment={segment}
                className={segment.type === 'currency' ? styles.Currency : undefined}
              />
            )
          }
        </NumberFlow.Segments>
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <button type="button" className={button.Root} onClick={() => setValue(Math.round(Math.random() * 500_000) / 100)}>
        Update total
      </button>
    </div>
  )
}
