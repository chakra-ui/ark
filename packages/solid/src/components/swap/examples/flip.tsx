import { Swap } from '@ark-ui/solid/swap'
import { PauseIcon, PlayIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/swap.module.css'

export const Flip = () => {
  const [swapped, setSwapped] = createSignal(false)

  return (
    <button type="button" class={styles.Button} onClick={() => setSwapped((prev) => !prev)}>
      <Swap.Root swap={swapped()} style={{ perspective: '200px' }}>
        <Swap.Indicator type="on" class={styles.FlipIndicator}>
          <PlayIcon />
        </Swap.Indicator>
        <Swap.Indicator type="off" class={styles.FlipIndicator}>
          <PauseIcon />
        </Swap.Indicator>
      </Swap.Root>
    </button>
  )
}
