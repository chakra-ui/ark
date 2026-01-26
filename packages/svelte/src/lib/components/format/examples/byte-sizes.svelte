<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'

  const byteSizes = [50, 5000, 5000000, 5000000000]
</script>

<div class={styles.List}>
  {#each byteSizes as size (size)}
    <div class={styles.ListItem}>
      <span class={styles.Value}>
        <Format.Byte value={size} />
      </span>
    </div>
  {/each}
</div>
