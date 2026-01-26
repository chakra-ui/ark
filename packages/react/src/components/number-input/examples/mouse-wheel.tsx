import { NumberInput } from '@ark-ui/react/number-input'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import styles from 'styles/number-input.module.css'

export const MouseWheel = () => (
  <NumberInput.Root className={styles.Root} allowMouseWheel>
    <NumberInput.Label className={styles.Label}>Label</NumberInput.Label>
    <NumberInput.Control className={styles.Control}>
      <NumberInput.Input className={styles.Input} />
      <div className={styles.TriggerGroup}>
        <NumberInput.IncrementTrigger className={styles.IncrementTrigger}>
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger className={styles.DecrementTrigger}>
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
      </div>
    </NumberInput.Control>
  </NumberInput.Root>
)
