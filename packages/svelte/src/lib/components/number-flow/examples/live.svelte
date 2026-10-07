<script lang="ts">
  import { NumberFlow } from '@ark-ui/svelte/number-flow'
  import button from 'styles/button.module.css'
  import styles from 'styles/number-flow.module.css'

  let value = $state(3)
</script>

<div class={styles.Card}>
  <span class={styles.Label}>Items in cart</span>
  <NumberFlow.Root {value} live={true} class={`${styles.Root} ${styles.Display}`}>
    <NumberFlow.Segments />
    <NumberFlow.HiddenValueText />
  </NumberFlow.Root>
  <span class={styles.Caption}>Screen readers announce the count once it settles.</span>
  <div class={styles.Actions}>
    <button type="button" class={button.Root} onclick={() => (value = Math.max(0, value - 1))}>Remove item</button>
    <button type="button" class={button.Root} data-variant="solid" onclick={() => (value += 1)}>Add item</button>
  </div>
</div>
