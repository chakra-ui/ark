<script lang="ts">
  import { Swap } from '@ark-ui/svelte/swap'
  import { CheckIcon, XIcon } from 'lucide-svelte'
  import styles from 'styles/swap.module.css'

  let swapped = $state(false)
</script>

<button type="button" class={styles.Button} onclick={() => (swapped = !swapped)}>
  <Swap.Root swap={swapped}>
    <Swap.Indicator type="on" class={styles.FadeIndicator}>
      <CheckIcon />
    </Swap.Indicator>
    <Swap.Indicator type="off" class={styles.FadeIndicator}>
      <XIcon />
    </Swap.Indicator>
  </Swap.Root>
</button>
