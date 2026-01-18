import { Highlight } from '@ark-ui/solid/highlight'
import styles from 'styles/highlight.module.css'

export const Multiple = () => (
  <p class={styles.Text}>
    <Highlight
      class={styles.Mark}
      query={['React', 'Vue']}
      text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
    />
  </p>
)
