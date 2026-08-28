import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const TimeWithDate = () => {
  return (
    <div class={styles.Inline}>
      <span class={styles.InlineLabel}>Boarding</span>
      <span class={styles.InlineValue}>
        <Format.Time value={new Date(2026, 1, 27, 18, 45, 34)} />
      </span>
    </div>
  )
}
