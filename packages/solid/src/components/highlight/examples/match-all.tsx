import { Highlight } from '@ark-ui/solid/highlight'
import styles from 'styles/highlight.module.css'

export const MatchAll = () => (
  <div class={styles.Root}>
    <div class={styles.Section}>
      <span class={styles.Label}>Match All</span>
      <p class={styles.Text}>
        <Highlight
          class={styles.Mark}
          text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          query="component"
          matchAll
        />
      </p>
    </div>
    <div class={styles.Section}>
      <span class={styles.Label}>Match First Only</span>
      <p class={styles.Text}>
        <Highlight
          class={styles.Mark}
          text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          query="component"
          matchAll={false}
        />
      </p>
    </div>
  </div>
)
