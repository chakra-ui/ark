import { Highlight } from '@ark-ui/solid/highlight'
import styles from 'styles/highlight.module.css'

export const IgnoreCase = () => (
  <p class={styles.Text}>
    <Highlight
      class={styles.Mark}
      text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
      query="typescript"
      ignoreCase
    />
  </p>
)
