import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const NumberWithCurrency = () => {
  return (
    <span class={styles.Value}>
      <Format.Number value={1234.45} style="currency" currency="USD" />
    </span>
  )
}
