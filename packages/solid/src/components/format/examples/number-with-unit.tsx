import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const NumberWithUnit = () => {
  return (
    <span class={styles.Value}>
      <Format.Number value={384.4} style="unit" unit="kilometer" />
    </span>
  )
}
