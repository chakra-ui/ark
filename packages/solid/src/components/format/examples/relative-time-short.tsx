import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const RelativeTimeShort = () => {
  return (
    <div class={styles.Inline}>
      <span class={styles.InlineLabel}>Edited</span>
      <span class={styles.InlineValue}>
        <Format.RelativeTime value={new Date('2025-05-05')} style="short" />
      </span>
    </div>
  )
}
