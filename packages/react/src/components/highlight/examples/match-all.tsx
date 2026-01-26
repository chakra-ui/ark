import { Highlight } from '@ark-ui/react/highlight'
import styles from 'styles/highlight.module.css'

export const MatchAll = () => (
  <div className={styles.Root}>
    <div className={styles.Section}>
      <span className={styles.Label}>Match All</span>
      <p className={styles.Text}>
        <Highlight
          className={styles.Mark}
          text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          query="component"
          matchAll
        />
      </p>
    </div>
    <div className={styles.Section}>
      <span className={styles.Label}>Match First Only</span>
      <p className={styles.Text}>
        <Highlight
          className={styles.Mark}
          text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
          query="component"
          matchAll={false}
        />
      </p>
    </div>
  </div>
)
