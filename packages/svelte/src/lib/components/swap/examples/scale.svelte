<script lang="ts">
  import { Swap } from '@ark-ui/svelte/swap'
  import { Volume2Icon, VolumeXIcon } from 'lucide-svelte'
  import styles from 'styles/swap.module.css'

  let swapped = $state(false)
</script>

<button type="button" class={styles.Button} onclick={() => (swapped = !swapped)}>
  <Swap.Root swap={swapped}>
    <Swap.Indicator type="on" class={styles.ScaleIndicator}>
      <Volume2Icon />
    </Swap.Indicator>
    <Swap.Indicator type="off" class={styles.ScaleIndicator}>
      <VolumeXIcon />
    </Swap.Indicator>
  </Swap.Root>
</button>
