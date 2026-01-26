<script lang="ts">
  import { Highlight } from '@ark-ui/svelte/highlight'
  import styles from 'styles/highlight.module.css'
</script>

<div class={styles.Root}>
  <div class={styles.Section}>
    <span class={styles.Label}>Partial Match</span>
    <p class={styles.Text}>
      <Highlight
        class={styles.Mark}
        query="box"
        text="The checkbox component renders a box element. Use combobox for autocomplete."
        matchAll
      />
    </p>
  </div>
  <div class={styles.Section}>
    <span class={styles.Label}>Exact Match</span>
    <p class={styles.Text}>
      <Highlight
        class={styles.Mark}
        query="box"
        text="The checkbox component renders a box element. Use combobox for autocomplete."
        exactMatch
        matchAll
      />
    </p>
  </div>
</div>
