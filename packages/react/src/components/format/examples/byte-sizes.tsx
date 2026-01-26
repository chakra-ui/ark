import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const ByteSizes = () => {
  const byteSizes = [50, 5000, 5000000, 5000000000]

  return (
    <div className={styles.List}>
      {byteSizes.map((size) => (
        <div key={size} className={styles.ListItem}>
          <span className={styles.Value}>
            <Format.Byte value={size} />
          </span>
        </div>
      ))}
    </div>
  )
}
