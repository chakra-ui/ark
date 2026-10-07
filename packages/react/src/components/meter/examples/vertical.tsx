import { Meter } from '@ark-ui/react/meter'
import { useEffect, useState } from 'react'
import styles from 'styles/meter.module.css'

const channels = ['L', 'R', 'C', 'Sub']

const sample = () => channels.map(() => Math.round(20 + Math.random() * 80))

export const Vertical = () => {
  const [levels, setLevels] = useState(() => channels.map(() => 50))

  useEffect(() => {
    const id = setInterval(() => setLevels(sample()), 600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.Levels}>
      {channels.map((channel, index) => (
        <Meter.Root
          key={channel}
          className={`${styles.Root} ${styles.Graded}`}
          orientation="vertical"
          value={levels[index]}
          low={60}
          high={85}
          optimum={30}
        >
          <Meter.Track className={styles.Track}>
            <Meter.Indicator className={styles.Indicator} />
          </Meter.Track>
          <Meter.Label className={styles.Label}>{channel}</Meter.Label>
        </Meter.Root>
      ))}
    </div>
  )
}
