import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const TimeWithDate = () => {
  return (
    <div className={styles.Inline}>
      <span className={styles.InlineLabel}>Boarding</span>
      <span className={styles.InlineValue}>
        <Format.Time value={new Date(2026, 1, 27, 18, 45, 34)} />
      </span>
    </div>
  )
}
