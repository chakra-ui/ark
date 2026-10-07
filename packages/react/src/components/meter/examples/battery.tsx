import { Meter } from '@ark-ui/react/meter'
import { ZapIcon } from 'lucide-react'
import styles from 'styles/meter.module.css'

export const Battery = () => (
  <Meter.Root
    className={`${styles.Battery} ${styles.Graded}`}
    defaultValue={18}
    low={20}
    high={50}
    optimum={100}
    aria-label="Battery remaining"
  >
    <Meter.Track className={styles.Track}>
      <Meter.Indicator className={styles.Indicator} />
    </Meter.Track>
    <Meter.ValueText className={styles.ValueText} />
    <ZapIcon />
  </Meter.Root>
)
