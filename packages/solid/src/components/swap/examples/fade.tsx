import { Swap } from '@ark-ui/solid/swap'
import { CheckIcon, XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/swap.module.css'

export const Fade = () => {
  const [swapped, setSwapped] = createSignal(false)

  return (
    <button type="button" class={styles.Button} onClick={() => setSwapped((prev) => !prev)}>
      <Swap.Root swap={swapped()}>
        <Swap.Indicator type="on" class={styles.FadeIndicator}>
          <CheckIcon />
        </Swap.Indicator>
        <Swap.Indicator type="off" class={styles.FadeIndicator}>
          <XIcon />
        </Swap.Indicator>
      </Swap.Root>
    </button>
  )
}
