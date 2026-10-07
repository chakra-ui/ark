<script lang="ts">
  import { NumberFlow } from '@ark-ui/svelte/number-flow'
  import button from 'styles/button.module.css'
  import styles from 'styles/number-flow.module.css'

  let value = $state(1299.99)
</script>

<div class={styles.Card}>
  <span class={styles.Label}>Total due</span>
  <NumberFlow.Root {value} formatOptions={{ style: 'currency', currency: 'USD' }} class={`${styles.Root} ${styles.Display}`}>
    <NumberFlow.Segments>
      {#snippet children(segment)}
        {#if segment.kind === 'digit'}
          <NumberFlow.Digit {segment} class={segment.place < 0 ? styles.Fraction : undefined} />
        {:else}
          <NumberFlow.Symbol {segment} class={segment.type === 'currency' ? styles.Currency : undefined} />
        {/if}
      {/snippet}
    </NumberFlow.Segments>
    <NumberFlow.HiddenValueText />
  </NumberFlow.Root>
  <button type="button" class={button.Root} onclick={() => (value = Math.round(Math.random() * 500_000) / 100)}>
    Update total
  </button>
</div>
