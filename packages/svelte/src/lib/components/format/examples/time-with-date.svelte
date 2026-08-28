<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'
</script>

<div class={styles.Inline}>
  <span class={styles.InlineLabel}>Boarding</span>
  <span class={styles.InlineValue}>
    <Format.Time value={new Date(2026, 1, 27, 18, 45, 34)} />
  </span>
</div>
