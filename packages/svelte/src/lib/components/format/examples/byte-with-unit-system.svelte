<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'
</script>

<div class={styles.List}>
  <div class={styles.ListItem}>
    <span class={styles.InlineLabel}>Decimal (1000 bytes):</span>
    <span class={styles.InlineValue}>
      <Format.Byte value={1024} unitSystem="decimal" />
    </span>
  </div>
  <div class={styles.ListItem}>
    <span class={styles.InlineLabel}>Binary (1024 bytes):</span>
    <span class={styles.InlineValue}>
      <Format.Byte value={1024} unitSystem="binary" />
    </span>
  </div>
</div>
