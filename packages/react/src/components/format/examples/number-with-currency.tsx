import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const NumberWithCurrency = () => {
  return (
    <span className={styles.Value}>
      <Format.Number value={1234.45} style="currency" currency="USD" />
    </span>
  )
}
