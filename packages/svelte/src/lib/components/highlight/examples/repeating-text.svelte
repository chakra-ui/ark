<script lang="ts">
  import { Highlight } from '@ark-ui/svelte/highlight'
  import styles from 'styles/highlight.module.css'
</script>

<p class={styles.Text}>
  <Highlight
    class={styles.Mark}
    query="@ark-ui.com"
    text="Contact us at support@ark-ui.com or sales@ark-ui.com for assistance."
    matchAll
  />
</p>
