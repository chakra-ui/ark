import { Swap } from '@ark-ui/react/swap'
import { CheckIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/swap.module.css'

export const Fade = () => {
  const [swapped, setSwapped] = useState(false)

  return (
    <button type="button" className={styles.Button} onClick={() => setSwapped((prev) => !prev)}>
      <Swap.Root swap={swapped}>
        <Swap.Indicator type="on" className={styles.FadeIndicator}>
          <CheckIcon />
        </Swap.Indicator>
        <Swap.Indicator type="off" className={styles.FadeIndicator}>
          <XIcon />
        </Swap.Indicator>
      </Swap.Root>
    </button>
  )
}
