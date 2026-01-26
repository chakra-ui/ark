<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'
</script>

<div class={styles.Inline}>
  <span class={styles.InlineLabel}>Last updated</span>
  <span class={styles.InlineValue}>
    <Format.RelativeTime value={new Date('2025-05-05')} />
  </span>
</div>
