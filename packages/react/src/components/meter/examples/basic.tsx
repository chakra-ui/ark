import { Meter } from '@ark-ui/react/meter'
import styles from 'styles/meter.module.css'

export const Basic = () => (
  <Meter.Root className={styles.Root} defaultValue={24}>
    <Meter.Label className={styles.Label}>Storage used</Meter.Label>
    <Meter.ValueText className={styles.ValueText} />
    <Meter.Track className={styles.Track}>
      <Meter.Indicator className={styles.Indicator} />
    </Meter.Track>
  </Meter.Root>
)
