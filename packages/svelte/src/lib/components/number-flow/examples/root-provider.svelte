<script lang="ts">
  import { NumberFlow, useNumberFlow } from '@ark-ui/svelte/number-flow'
  import button from 'styles/button.module.css'
  import styles from 'styles/number-flow.module.css'

  const id = $props.id()
  const numberFlow = useNumberFlow({ id, defaultValue: 6800 })
</script>

<div class={styles.Card}>
  <span class={styles.Label}>Daily steps</span>
  <NumberFlow.RootProvider value={numberFlow} class={`${styles.Root} ${styles.Display}`}>
    <NumberFlow.Segments />
    <NumberFlow.HiddenValueText />
  </NumberFlow.RootProvider>
  <div class={styles.Actions}>
    <button type="button" class={button.Root} onclick={() => numberFlow().setValue(numberFlow().value - 500)}>
      -500
    </button>
    <button type="button" class={button.Root} onclick={() => numberFlow().setValue(numberFlow().value + 500)}>
      +500
    </button>
  </div>
</div>
