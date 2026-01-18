import { Highlight } from '@ark-ui/react/highlight'
import { useState } from 'react'
import field from 'styles/field.module.css'
import styles from 'styles/highlight.module.css'

export const DynamicQuery = () => {
  const [query, setQuery] = useState('component')
  return (
    <div className={styles.Root}>
      <input
        className={field.Input}
        type="text"
        placeholder="Search text..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className={styles.Text}>
        <Highlight
          className={styles.Mark}
          query={query}
          text="With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue."
        />
      </p>
    </div>
  )
}
