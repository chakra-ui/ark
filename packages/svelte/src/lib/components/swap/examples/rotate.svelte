<script lang="ts">
  import { Swap } from '@ark-ui/svelte/swap'
  import { MoonIcon, SunIcon } from 'lucide-svelte'
  import styles from 'styles/swap.module.css'

  let swapped = $state(false)
</script>

<button type="button" class={styles.Button} onclick={() => (swapped = !swapped)}>
  <Swap.Root swap={swapped}>
    <Swap.Indicator type="on" class={styles.RotateIndicator}>
      <SunIcon />
    </Swap.Indicator>
    <Swap.Indicator type="off" class={styles.RotateIndicator}>
      <MoonIcon />
    </Swap.Indicator>
  </Swap.Root>
</button>
