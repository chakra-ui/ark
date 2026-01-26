<script lang="ts">
  import { Format } from '@ark-ui/svelte/format'
  import styles from 'styles/format.module.css'

  const unitDisplays = ['narrow', 'short', 'long'] as const
</script>

<div class={styles.List}>
  {#each unitDisplays as unitDisplay (unitDisplay)}
    <div class={styles.ListItem}>
      <span class={styles.InlineLabel}>{unitDisplay}:</span>
      <span class={styles.Value}>
        <Format.Byte value={50345.53} {unitDisplay} />
      </span>
    </div>
  {/each}
</div>
