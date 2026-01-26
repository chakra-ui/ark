import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const ByteWithUnitSystem = () => {
  return (
    <div className={styles.List}>
      <div className={styles.ListItem}>
        <span className={styles.InlineLabel}>Decimal (1000 bytes):</span>
        <span className={styles.InlineValue}>
          <Format.Byte value={1024} unitSystem="decimal" />
        </span>
      </div>
      <div className={styles.ListItem}>
        <span className={styles.InlineLabel}>Binary (1024 bytes):</span>
        <span className={styles.InlineValue}>
          <Format.Byte value={1024} unitSystem="binary" />
        </span>
      </div>
    </div>
  )
}
