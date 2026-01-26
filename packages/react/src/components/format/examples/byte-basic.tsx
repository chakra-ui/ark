import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const ByteBasic = () => {
  return (
    <div className={styles.Root}>
      <span className={styles.Label}>File size</span>
      <span className={styles.Value}>
        <Format.Byte value={120000} />
      </span>
    </div>
  )
}
