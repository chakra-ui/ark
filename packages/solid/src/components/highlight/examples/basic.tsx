import { Highlight } from '@ark-ui/solid/highlight'
import styles from 'styles/highlight.module.css'

export const Basic = () => (
  <p class={styles.Text}>
    <Highlight
      class={styles.Mark}
      query="component"
      text="Ark UI is a headless component library for building accessible web applications."
    />
  </p>
)
