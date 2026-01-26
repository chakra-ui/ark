import { Highlight } from '@ark-ui/react/highlight'
import styles from 'styles/highlight.module.css'

export const RepeatingText = () => (
  <p className={styles.Text}>
    <Highlight
      className={styles.Mark}
      query="@ark-ui.com"
      text="Contact us at support@ark-ui.com or sales@ark-ui.com for assistance."
      matchAll
    />
  </p>
)
