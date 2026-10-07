import { Meter } from '@ark-ui/react/meter'
import styles from 'styles/meter.module.css'

export const MinMax = () => (
  <Meter.Root
    className={styles.Root}
    defaultValue={18}
    min={-10}
    max={40}
    formatOptions={{ style: 'unit', unit: 'celsius' }}
  >
    <Meter.Label className={styles.Label}>Temperature</Meter.Label>
    <Meter.ValueText className={styles.ValueText} />
    <Meter.Track className={styles.Track}>
      <Meter.Indicator className={styles.Indicator} />
    </Meter.Track>
  </Meter.Root>
)
