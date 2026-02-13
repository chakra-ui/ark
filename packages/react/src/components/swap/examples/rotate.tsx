import { Swap } from '@ark-ui/react/swap'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/swap.module.css'

export const Rotate = () => {
  const [swapped, setSwapped] = useState(false)

  return (
    <button type="button" className={styles.Button} onClick={() => setSwapped((prev) => !prev)}>
      <Swap.Root swap={swapped}>
        <Swap.Indicator type="on" className={styles.RotateIndicator}>
          <SunIcon />
        </Swap.Indicator>
        <Swap.Indicator type="off" className={styles.RotateIndicator}>
          <MoonIcon />
        </Swap.Indicator>
      </Swap.Root>
    </button>
  )
}
