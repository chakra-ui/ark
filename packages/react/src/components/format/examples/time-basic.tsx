import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const TimeBasic = () => {
  return (
    <span className={styles.Value}>
      <Format.Time value="18:47:12" format="12h" />
    </span>
  )
}
