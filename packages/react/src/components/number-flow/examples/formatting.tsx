import { NumberFlow } from '@ark-ui/react/number-flow'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

const random = (min: number, max: number) => Math.random() * (max - min) + min

export const Formatting = () => {
  const [revenue, setRevenue] = useState(48250.75)
  const [growth, setGrowth] = useState(0.124)
  const [visitors, setVisitors] = useState(1_284_000)

  const shuffle = () => {
    setRevenue(random(20_000, 90_000))
    setGrowth(random(-0.2, 0.4))
    setVisitors(random(200_000, 9_000_000))
  }

  return (
    <div className="stack">
      <div className={styles.Grid}>
        <div className={styles.Stat}>
          <span className={styles.Label}>Revenue</span>
          <NumberFlow.Root
            value={revenue}
            formatOptions={{ style: 'currency', currency: 'USD' }}
            className={styles.Root}
          >
            <NumberFlow.Segments />
            <NumberFlow.HiddenValueText />
          </NumberFlow.Root>
        </div>
        <div className={styles.Stat}>
          <span className={styles.Label}>Growth</span>
          <NumberFlow.Root
            value={growth}
            formatOptions={{ style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' }}
            className={`${styles.Root} ${styles.Trend}`}
          >
            <NumberFlow.Segments />
            <NumberFlow.HiddenValueText />
          </NumberFlow.Root>
        </div>
        <div className={styles.Stat}>
          <span className={styles.Label}>Visitors</span>
          <NumberFlow.Root
            value={visitors}
            formatOptions={{ notation: 'compact', maximumFractionDigits: 1 }}
            className={styles.Root}
          >
            <NumberFlow.Segments />
            <NumberFlow.HiddenValueText />
          </NumberFlow.Root>
        </div>
      </div>
      <button type="button" className={button.Root} onClick={shuffle}>
        Shuffle
      </button>
    </div>
  )
}
