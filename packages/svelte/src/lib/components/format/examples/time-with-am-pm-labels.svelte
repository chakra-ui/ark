<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'
</script>

<div class={styles.Inline}>
  <span class={styles.InlineLabel}>Support window</span>
  <span class={styles.InlineValue}>
    <Format.Time value="17:15:00" format="12h" amLabel="morning" pmLabel="evening" />
  </span>
</div>
