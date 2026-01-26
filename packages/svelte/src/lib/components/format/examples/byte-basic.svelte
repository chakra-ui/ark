<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'
</script>

<div class={styles.Root}>
  <span class={styles.Label}>File size</span>
  <span class={styles.Value}>
    <Format.Byte value={120000} />
  </span>
</div>
