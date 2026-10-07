<script lang="ts">
  import { Meter } from '@ark-ui/svelte/meter'
  import styles from 'styles/meter.module.css'

  const messages = {
    optimal: 'Plenty of space left',
    suboptimal: 'Running low on space',
    'least-optimal': 'Almost out of space',
  }
</script>

<Meter.Root class={`${styles.Root} ${styles.Graded}`} defaultValue={86} low={60} high={85} optimum={0}>
  <Meter.Label class={styles.Label}>Disk usage</Meter.Label>
  <Meter.ValueText class={styles.ValueText} />
  <Meter.Track class={styles.Track}>
    <Meter.Indicator class={styles.Indicator} />
  </Meter.Track>
  <Meter.Context>
    {#snippet render(meter)}
      <span class={`${styles.Hint} ${styles.Status}`} data-state={meter().valueState}>
        {messages[meter().valueState]}
      </span>
    {/snippet}
  </Meter.Context>
</Meter.Root>
