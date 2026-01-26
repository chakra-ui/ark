import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const NumberWithCompact = () => {
  return (
    <div class={styles.Root}>
      <span class={styles.ValueLarge}>
        <Format.Number value={1500000} notation="compact" compactDisplay="short" />
      </span>
      <span class={styles.Label}>downloads per month</span>
    </div>
  )
}
