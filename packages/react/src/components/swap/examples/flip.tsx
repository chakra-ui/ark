import { Swap } from '@ark-ui/react/swap'
import { PauseIcon, PlayIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/swap.module.css'

export const Flip = () => {
  const [swapped, setSwapped] = useState(false)

  return (
    <button type="button" className={styles.Button} onClick={() => setSwapped((prev) => !prev)}>
      <Swap.Root swap={swapped} style={{ perspective: '200px' }}>
        <Swap.Indicator type="on" className={styles.FlipIndicator}>
          <PlayIcon />
        </Swap.Indicator>
        <Swap.Indicator type="off" className={styles.FlipIndicator}>
          <PauseIcon />
        </Swap.Indicator>
      </Swap.Root>
    </button>
  )
}
