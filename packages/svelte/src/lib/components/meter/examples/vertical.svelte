<script lang="ts">
  import { Meter } from '@ark-ui/svelte/meter'
  import styles from 'styles/meter.module.css'

  const channels = ['L', 'R', 'C', 'Sub']

  const sample = () => channels.map(() => Math.round(20 + Math.random() * 80))

  let levels = $state(channels.map(() => 50))

  $effect(() => {
    const id = setInterval(() => {
      levels = sample()
    }, 600)
    return () => clearInterval(id)
  })
</script>

<div class={styles.Levels}>
  {#each channels as channel, index (channel)}
    <Meter.Root
      class={`${styles.Root} ${styles.Graded}`}
      orientation="vertical"
      value={levels[index]}
      low={60}
      high={85}
      optimum={30}
    >
      <Meter.Track class={styles.Track}>
        <Meter.Indicator class={styles.Indicator} />
      </Meter.Track>
      <Meter.Label class={styles.Label}>{channel}</Meter.Label>
    </Meter.Root>
  {/each}
</div>
