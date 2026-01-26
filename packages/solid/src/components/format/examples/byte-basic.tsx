import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const ByteBasic = () => {
  return (
    <div class={styles.Root}>
      <span class={styles.Label}>File size</span>
      <span class={styles.Value}>
        <Format.Byte value={120000} />
      </span>
    </div>
  )
}
