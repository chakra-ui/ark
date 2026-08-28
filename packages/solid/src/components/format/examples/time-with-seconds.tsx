import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const TimeWithSeconds = () => {
  return (
    <div class={styles.Inline}>
      <span class={styles.InlineLabel}>Last sync</span>
      <span class={styles.InlineValue}>
        <Format.Time value="03:07:19" format="12h" withSeconds />
      </span>
    </div>
  )
}
