import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const TimeWithAmPmLabels = () => {
  return (
    <div class={styles.Inline}>
      <span class={styles.InlineLabel}>Support window</span>
      <span class={styles.InlineValue}>
        <Format.Time value="17:15:00" format="12h" amLabel="morning" pmLabel="evening" />
      </span>
    </div>
  )
}
