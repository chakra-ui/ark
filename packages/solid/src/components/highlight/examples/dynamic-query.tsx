import { Highlight } from '@ark-ui/solid/highlight'
import { createSignal } from 'solid-js'
import field from 'styles/field.module.css'
import styles from 'styles/highlight.module.css'

export const DynamicQuery = () => {
  const [query, setQuery] = createSignal('component')
  return (
    <div class={styles.Root}>
      <input
        class={field.Input}
        type="text"
        placeholder="Search text..."
        value={query()}
        onInput={(e) => setQuery(e.target.value)}
      />
      <p class={styles.Text}>
        <Highlight
          class={styles.Mark}
          query={query()}
          text="With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue."
        />
      </p>
    </div>
  )
}
