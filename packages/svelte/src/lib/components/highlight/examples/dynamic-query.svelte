<script lang="ts">
  import { Highlight } from '@ark-ui/svelte/highlight'
  import field from 'styles/field.module.css'
  import styles from 'styles/highlight.module.css'

  let query = $state('component')
</script>

<div class={styles.Root}>
  <input class={field.Input} type="text" placeholder="Search text..." bind:value={query} />
  <p class={styles.Text}>
    <Highlight
      class={styles.Mark}
      {query}
      text="With Ark UI, you can build accessible, custom components. Each component is fully typed and works seamlessly with React, Solid, Svelte, and Vue."
    />
  </p>
</div>
