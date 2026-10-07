<script lang="ts">
  import { Meter } from '@ark-ui/svelte/meter'
  import styles from 'styles/meter.module.css'

  const servers = [
    { name: 'api-1', load: 32 },
    { name: 'api-2', load: 68 },
    { name: 'api-3', load: 91 },
  ]
</script>

<div class={styles.Stack}>
  {#each servers as server (server.name)}
    <Meter.Root class={`${styles.Root} ${styles.Graded}`} defaultValue={server.load} low={50} high={80} optimum={0}>
      <Meter.Label class={styles.Label}>{server.name}</Meter.Label>
      <Meter.ValueText class={styles.ValueText} />
      <Meter.Track class={styles.Track}>
        <Meter.Indicator class={styles.Indicator} />
      </Meter.Track>
    </Meter.Root>
  {/each}
</div>
