import { NumberFlow } from '@ark-ui/react/number-flow'
import { useEffect, useState } from 'react'
import styles from 'styles/number-flow.module.css'

export const PrefixSuffix = () => {
  const [throughput, setThroughput] = useState(1280)
  const [latency, setLatency] = useState(42)

  useEffect(() => {
    const id = setInterval(() => {
      setThroughput(Math.round(900 + Math.random() * 900))
      setLatency(Math.round(20 + Math.random() * 60))
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.Grid}>
      <div className={styles.Stat}>
        <span className={styles.Label}>Throughput</span>
        <NumberFlow.Root value={throughput} prefix="~" suffix=" req/s" className={styles.Root}>
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
      </div>
      <div className={styles.Stat}>
        <span className={styles.Label}>p95 latency</span>
        <NumberFlow.Root value={latency} suffix=" ms" className={styles.Root}>
          <NumberFlow.Segments />
          <NumberFlow.HiddenValueText />
        </NumberFlow.Root>
      </div>
    </div>
  )
}
