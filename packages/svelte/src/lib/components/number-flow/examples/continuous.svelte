<script lang="ts">
  import { NumberFlow } from '@ark-ui/svelte/number-flow'
  import button from 'styles/button.module.css'
  import styles from 'styles/number-flow.module.css'

  let value = $state(120)
</script>

<div class={styles.Card}>
  <span class={styles.Label}>Points</span>
  <NumberFlow.Root {value} continuous={true} class={`${styles.Root} ${styles.Display}`}>
    <NumberFlow.Segments />
    <NumberFlow.HiddenValueText />
  </NumberFlow.Root>
  <span class={styles.Caption}>Every digit spins through the values in between.</span>
  <div class={styles.Actions}>
    <button type="button" class={button.Root} onclick={() => (value += 12)}>+12</button>
    <button type="button" class={button.Root} onclick={() => (value += 125)}>+125</button>
    <button type="button" class={button.Root} onclick={() => (value = 120)}>Reset</button>
  </div>
</div>
