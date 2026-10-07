<script lang="ts">
  import { NumberFlow } from '@ark-ui/svelte/number-flow'
  import button from 'styles/button.module.css'
  import styles from 'styles/number-flow.module.css'

  const random = (min: number, max: number) => Math.random() * (max - min) + min

  let revenue = $state(48250.75)
  let growth = $state(0.124)
  let visitors = $state(1_284_000)

  const shuffle = () => {
    revenue = random(20_000, 90_000)
    growth = random(-0.2, 0.4)
    visitors = random(200_000, 9_000_000)
  }
</script>

<div class="stack">
  <div class={styles.Grid}>
    <div class={styles.Stat}>
      <span class={styles.Label}>Revenue</span>
      <NumberFlow.Root value={revenue} formatOptions={{ style: 'currency', currency: 'USD' }} class={styles.Root}>
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
    </div>
    <div class={styles.Stat}>
      <span class={styles.Label}>Growth</span>
      <NumberFlow.Root
        value={growth}
        formatOptions={{ style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' }}
        class={`${styles.Root} ${styles.Trend}`}
      >
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
    </div>
    <div class={styles.Stat}>
      <span class={styles.Label}>Visitors</span>
      <NumberFlow.Root
        value={visitors}
        formatOptions={{ notation: 'compact', maximumFractionDigits: 1 }}
        class={styles.Root}
      >
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
    </div>
  </div>
  <button type="button" class={button.Root} onclick={shuffle}>Shuffle</button>
</div>
