import { Highlight } from '@ark-ui/solid/highlight'
import styles from 'styles/highlight.module.css'

export const RepeatingText = () => (
  <p class={styles.Text}>
    <Highlight
      class={styles.Mark}
      query="@ark-ui.com"
      text="Contact us at support@ark-ui.com or sales@ark-ui.com for assistance."
      matchAll
    />
  </p>
)
