import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const ByteWithUnit = () => {
  return (
    <div className={styles.Inline}>
      <span className={styles.InlineLabel}>File size:</span>
      <span className={styles.InlineValue}>
        <Format.Byte value={1450.45} unit="bit" />
      </span>
    </div>
  )
}
