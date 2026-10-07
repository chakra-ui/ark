import { NumberFlow } from '@ark-ui/react/number-flow'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'

export const Basic = () => {
  const [value, setValue] = useState(1248)

  return (
    <div className={styles.Card}>
      <span className={styles.Label}>Followers</span>
      <NumberFlow.Root value={value} className={`${styles.Root} ${styles.Display}`}>
        <NumberFlow.Segments />
        <NumberFlow.HiddenValueText />
      </NumberFlow.Root>
      <div className={styles.Actions}>
        <button type="button" className={button.Root} onClick={() => setValue((v) => v - 1)}>
          <MinusIcon /> Unfollow
        </button>
        <button type="button" className={button.Root} data-variant="solid" onClick={() => setValue((v) => v + 1)}>
          <PlusIcon /> Follow
        </button>
      </div>
    </div>
  )
}
