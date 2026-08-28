import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const TimeWithSeconds = () => {
  return (
    <div className={styles.Inline}>
      <span className={styles.InlineLabel}>Last sync</span>
      <span className={styles.InlineValue}>
        <Format.Time value="03:07:19" format="12h" withSeconds />
      </span>
    </div>
  )
}
