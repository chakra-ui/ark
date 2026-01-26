import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const RelativeTimeBasic = () => {
  return (
    <div className={styles.Inline}>
      <span className={styles.InlineLabel}>Last updated</span>
      <span className={styles.InlineValue}>
        <Format.RelativeTime value={new Date('2025-05-05')} />
      </span>
    </div>
  )
}
