import { Format } from '@ark-ui/solid/format'
import styles from 'styles/format.module.css'

export const NumberBasic = () => {
  return (
    <span class={styles.Value}>
      <Format.Number value={1450.45} />
    </span>
  )
}
