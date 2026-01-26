import { Highlight } from '@ark-ui/react/highlight'
import styles from 'styles/highlight.module.css'

export const Basic = () => (
  <p className={styles.Text}>
    <Highlight
      className={styles.Mark}
      query="component"
      text="Ark UI is a headless component library for building accessible web applications."
    />
  </p>
)
