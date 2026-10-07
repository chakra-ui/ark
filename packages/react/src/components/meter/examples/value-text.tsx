import { Meter } from '@ark-ui/react/meter'
import styles from 'styles/meter.module.css'

export const ValueText = () => (
  <Meter.Root
    className={styles.Root}
    defaultValue={3}
    max={5}
    translations={{ value: ({ value, max }) => `${value} of ${max} tasks` }}
  >
    <Meter.Label className={styles.Label}>Onboarding</Meter.Label>
    <Meter.ValueText className={styles.ValueText} />
    <Meter.Track className={styles.Track}>
      <Meter.Indicator className={styles.Indicator} />
    </Meter.Track>
  </Meter.Root>
)
