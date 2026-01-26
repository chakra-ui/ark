import { Highlight } from '@ark-ui/react/highlight'
import styles from 'styles/highlight.module.css'

export const IgnoreCase = () => (
  <p className={styles.Text}>
    <Highlight
      className={styles.Mark}
      text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
      query="typescript"
      ignoreCase
    />
  </p>
)
