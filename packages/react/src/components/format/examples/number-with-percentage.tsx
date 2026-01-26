import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const NumberWithPercentage = () => {
  return (
    <span className={styles.Value}>
      <Format.Number value={0.145} style="percent" maximumFractionDigits={2} minimumFractionDigits={2} />
    </span>
  )
}
