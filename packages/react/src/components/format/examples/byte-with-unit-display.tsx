import { Format } from '@ark-ui/react/format'
import styles from 'styles/format.module.css'

export const ByteWithUnitDisplay = () => {
  const unitDisplays = ['narrow', 'short', 'long'] as const

  return (
    <div className={styles.List}>
      {unitDisplays.map((unitDisplay) => (
        <div key={unitDisplay} className={styles.ListItem}>
          <span className={styles.InlineLabel}>{unitDisplay}:</span>
          <span className={styles.Value}>
            <Format.Byte value={50345.53} unitDisplay={unitDisplay} />
          </span>
        </div>
      ))}
    </div>
  )
}
