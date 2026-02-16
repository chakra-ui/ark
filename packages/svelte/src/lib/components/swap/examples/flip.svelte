<script lang="ts">
  import { Swap } from '@ark-ui/svelte/swap'
  import { PauseIcon, PlayIcon } from 'lucide-svelte'
  import styles from 'styles/swap.module.css'

  let swapped = $state(false)
</script>

<button type="button" class={styles.Button} onclick={() => (swapped = !swapped)}>
  <Swap.Root swap={swapped} style="perspective: 200px">
    <Swap.Indicator type="on" class={styles.FlipIndicator}>
      <PlayIcon />
    </Swap.Indicator>
    <Swap.Indicator type="off" class={styles.FlipIndicator}>
      <PauseIcon />
    </Swap.Indicator>
  </Swap.Root>
</button>
