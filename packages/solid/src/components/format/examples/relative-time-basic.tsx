import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const RelativeTimeBasic = () => {
  return (
    <div class={styles.Inline}>
      <span class={styles.InlineLabel}>Last updated</span>
      <span class={styles.InlineValue}>
        <Format.RelativeTime value={new Date('2025-05-05')} />
      </span>
    </div>
  )
}
