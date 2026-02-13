import { Swap } from '@ark-ui/react/swap'
import { Volume2Icon, VolumeXIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/swap.module.css'

export const Scale = () => {
  const [swapped, setSwapped] = useState(false)

  return (
    <button type="button" className={styles.Button} onClick={() => setSwapped((prev) => !prev)}>
      <Swap.Root swap={swapped}>
        <Swap.Indicator type="on" className={styles.ScaleIndicator}>
          <Volume2Icon />
        </Swap.Indicator>
        <Swap.Indicator type="off" className={styles.ScaleIndicator}>
          <VolumeXIcon />
        </Swap.Indicator>
      </Swap.Root>
    </button>
  )
}
