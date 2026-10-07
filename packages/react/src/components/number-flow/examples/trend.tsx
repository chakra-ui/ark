import { NumberFlow } from '@ark-ui/react/number-flow'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from 'styles/number-flow.module.css'

const open = 182.4

export const Trend = () => {
  const [price, setPrice] = useState(open)

  useEffect(() => {
    const id = setInterval(() => {
      setPrice((prev) => Math.max(1, prev + (Math.random() - 0.48) * 3))
    }, 1600)
    return () => clearInterval(id)
  }, [])

  const change = (price - open) / open
  const direction = change >= 0 ? 'up' : 'down'

  return (
    <div className={styles.Card}>
      <div className={styles.Header}>
        <span className={styles.Label}>ARK · Nasdaq</span>
        <span className={styles.Badge} data-trend={direction}>
          {direction === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
          <NumberFlow.Root
            value={change}
            formatOptions={{
              style: 'percent',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              signDisplay: 'always',
            }}
            className={styles.Root}
          >
            <NumberFlow.Segments />
            <NumberFlow.HiddenValueText />
          </NumberFlow.Root>
        </span>
      </div>
      <NumberFlow.Root
        value={price}
        trend={true}
        formatOptions={{ style: 'currency', currency: 'USD' }}
        className={`${styles.Root} ${styles.Display} ${styles.Trend}`}
      >
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <span className={styles.Caption}>Digits roll in the direction the price moved.</span>
    </div>
  )
}
