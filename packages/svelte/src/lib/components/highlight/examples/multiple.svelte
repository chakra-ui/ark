<script lang="ts">
  import { Highlight } from '@ark-ui/svelte/highlight'
  import styles from 'styles/highlight.module.css'
</script>

<p class={styles.Text}>
  <Highlight
    class={styles.Mark}
    query={['React', 'Vue']}
    text="Ark UI provides React, Solid, Vue, and Svelte components that are accessible and customizable."
  />
</p>
