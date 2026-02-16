import { Swap } from '@ark-ui/solid/swap'
import { Volume2Icon, VolumeXIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/swap.module.css'

export const Scale = () => {
  const [swapped, setSwapped] = createSignal(false)

  return (
    <button type="button" class={styles.Button} onClick={() => setSwapped((prev) => !prev)}>
      <Swap.Root swap={swapped()}>
        <Swap.Indicator type="on" class={styles.ScaleIndicator}>
          <Volume2Icon />
        </Swap.Indicator>
        <Swap.Indicator type="off" class={styles.ScaleIndicator}>
          <VolumeXIcon />
        </Swap.Indicator>
      </Swap.Root>
    </button>
  )
}
