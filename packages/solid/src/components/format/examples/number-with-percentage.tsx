import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const NumberWithPercentage = () => {
  return (
    <span class={styles.Value}>
      <Format.Number value={0.145} style="percent" maximumFractionDigits={2} minimumFractionDigits={2} />
    </span>
  )
}
