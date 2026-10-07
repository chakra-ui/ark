<script lang="ts">
  import { NumberFlow } from '@ark-ui/svelte/number-flow'
  import { TrendingDownIcon, TrendingUpIcon } from 'lucide-svelte'
  import styles from 'styles/number-flow.module.css'

  const open = 182.4

  let price = $state(open)

  $effect(() => {
    const id = setInterval(() => {
      price = Math.max(1, price + (Math.random() - 0.48) * 3)
    }, 1600)
    return () => clearInterval(id)
  })

  const change = $derived((price - open) / open)
  const direction = $derived(change >= 0 ? 'up' : 'down')
</script>

<div class={styles.Card}>
  <div class={styles.Header}>
    <span class={styles.Label}>ARK · Nasdaq</span>
    <span class={styles.Badge} data-trend={direction}>
      {#if direction === 'up'}
        <TrendingUpIcon />
      {:else}
        <TrendingDownIcon />
      {/if}
      <NumberFlow.Root
        value={change}
        formatOptions={{ style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' }}
        class={styles.Root}
      >
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
    </span>
  </div>
  <NumberFlow.Root
    value={price}
    trend={true}
    formatOptions={{ style: 'currency', currency: 'USD' }}
    class={`${styles.Root} ${styles.Display} ${styles.Trend}`}
  >
    <NumberFlow.Segments />
    <NumberFlow.HiddenValueText />
  </NumberFlow.Root>
  <span class={styles.Caption}>Digits roll in the direction the price moved.</span>
</div>
