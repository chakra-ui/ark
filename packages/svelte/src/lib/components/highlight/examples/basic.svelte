<script lang="ts">
  import { Highlight } from '@ark-ui/svelte/highlight'
  import styles from 'styles/highlight.module.css'
</script>

<p class={styles.Text}>
  <Highlight
    class={styles.Mark}
    query="component"
    text="Ark UI is a headless component library for building accessible web applications."
  />
</p>
