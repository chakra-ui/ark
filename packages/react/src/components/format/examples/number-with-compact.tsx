import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const NumberWithCompact = () => {
  return (
    <div className={styles.Root}>
      <span className={styles.ValueLarge}>
        <Format.Number value={1500000} notation="compact" compactDisplay="short" />
      </span>
      <span className={styles.Label}>downloads per month</span>
    </div>
  )
}
