import { Meter } from '@ark-ui/react/meter'
import styles from 'styles/meter.module.css'

const messages = {
  optimal: 'Plenty of space left',
  suboptimal: 'Running low on space',
  'least-optimal': 'Almost out of space',
}

export const Context = () => (
  <Meter.Root className={`${styles.Root} ${styles.Graded}`} defaultValue={86} low={60} high={85} optimum={0}>
    <Meter.Label className={styles.Label}>Disk usage</Meter.Label>
    <Meter.ValueText className={styles.ValueText} />
    <Meter.Track className={styles.Track}>
      <Meter.Indicator className={styles.Indicator} />
    </Meter.Track>
    <Meter.Context>
      {(meter) => (
        <span className={`${styles.Hint} ${styles.Status}`} data-state={meter.valueState}>
          {messages[meter.valueState]}
        </span>
      )}
    </Meter.Context>
  </Meter.Root>
)
