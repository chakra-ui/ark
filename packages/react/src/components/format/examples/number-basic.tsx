import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const NumberBasic = () => {
  return (
    <span className={styles.Value}>
      <Format.Number value={1450.45} />
    </span>
  )
}
