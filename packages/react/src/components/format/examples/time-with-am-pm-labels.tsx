import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const TimeWithAmPmLabels = () => {
  return (
    <div className={styles.Inline}>
      <span className={styles.InlineLabel}>Support window</span>
      <span className={styles.InlineValue}>
        <Format.Time value="17:15:00" format="12h" amLabel="morning" pmLabel="evening" />
      </span>
    </div>
  )
}
