<script lang="ts">
  import { NumberFlow } from '@ark-ui/svelte/number-flow'
  import styles from 'styles/number-flow.module.css'

  let throughput = $state(1280)
  let latency = $state(42)

  $effect(() => {
    const id = setInterval(() => {
      throughput = Math.round(900 + Math.random() * 900)
      latency = Math.round(20 + Math.random() * 60)
    }, 2000)
    return () => clearInterval(id)
  })
</script>

<div class={styles.Grid}>
  <div class={styles.Stat}>
    <span class={styles.Label}>Throughput</span>
    <NumberFlow.Root value={throughput} prefix="~" suffix=" req/s" class={styles.Root}>
      <NumberFlow.Segments />
      <NumberFlow.HiddenValueText />
    </NumberFlow.Root>
  </div>
  <div class={styles.Stat}>
    <span class={styles.Label}>p95 latency</span>
    <NumberFlow.Root value={latency} suffix=" ms" class={styles.Root}>
      <NumberFlow.Segments />
      <NumberFlow.HiddenValueText />
    </NumberFlow.Root>
  </div>
</div>
