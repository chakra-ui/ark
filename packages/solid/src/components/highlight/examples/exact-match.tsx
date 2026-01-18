import { Highlight } from '@ark-ui/solid/highlight'
import styles from 'styles/highlight.module.css'

export const ExactMatch = () => (
  <div class={styles.Root}>
    <div class={styles.Section}>
      <span class={styles.Label}>Partial Match</span>
      <p class={styles.Text}>
        <Highlight
          class={styles.Mark}
          query="box"
          text="The checkbox component renders a box element. Use combobox for autocomplete."
          matchAll
        />
      </p>
    </div>
    <div class={styles.Section}>
      <span class={styles.Label}>Exact Match</span>
      <p class={styles.Text}>
        <Highlight
          class={styles.Mark}
          query="box"
          text="The checkbox component renders a box element. Use combobox for autocomplete."
          exactMatch
          matchAll
        />
      </p>
    </div>
  </div>
)
