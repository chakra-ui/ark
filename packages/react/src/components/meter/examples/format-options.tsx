import { Meter } from '@ark-ui/react/meter'
import styles from 'styles/meter.module.css'

export const FormatOptions = () => (
  <Meter.Root
    className={styles.Root}
    defaultValue={1240}
    max={2000}
    formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
  >
    <Meter.Label className={styles.Label}>Monthly budget</Meter.Label>
    <Meter.ValueText className={styles.ValueText} />
    <Meter.Track className={styles.Track}>
      <Meter.Indicator className={styles.Indicator} />
    </Meter.Track>
  </Meter.Root>
)
