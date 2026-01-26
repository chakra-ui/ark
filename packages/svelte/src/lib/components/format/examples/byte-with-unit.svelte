<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'
</script>

<div class={styles.Inline}>
  <span class={styles.InlineLabel}>File size:</span>
  <span class={styles.InlineValue}>
    <Format.Byte value={1450.45} unit="bit" />
  </span>
</div>
