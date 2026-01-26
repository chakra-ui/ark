import { Highlight } from '@ark-ui/react/highlight'
import styles from 'styles/highlight.module.css'

export const ExactMatch = () => (
  <div className={styles.Root}>
    <div className={styles.Section}>
      <span className={styles.Label}>Partial Match</span>
      <p className={styles.Text}>
        <Highlight
          className={styles.Mark}
          query="box"
          text="The checkbox component renders a box element. Use combobox for autocomplete."
          matchAll
        />
      </p>
    </div>
    <div className={styles.Section}>
      <span className={styles.Label}>Exact Match</span>
      <p className={styles.Text}>
        <Highlight
          className={styles.Mark}
          query="box"
          text="The checkbox component renders a box element. Use combobox for autocomplete."
          exactMatch
          matchAll
        />
      </p>
    </div>
  </div>
)
