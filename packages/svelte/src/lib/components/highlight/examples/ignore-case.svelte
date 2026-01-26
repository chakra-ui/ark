<script lang="ts">
  import { Highlight } from '@ark-ui/svelte/highlight'
  import styles from 'styles/highlight.module.css'
</script>

<p class={styles.Text}>
  <Highlight
    class={styles.Mark}
    text="TypeScript provides static type checking. Using typescript helps catch errors early in development."
    query="typescript"
    ignoreCase
  />
</p>
