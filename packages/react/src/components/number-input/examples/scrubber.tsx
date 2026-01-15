import { NumberInput } from '@ark-ui/react/number-input'
import { ChevronDownIcon, ChevronUpIcon, ArrowLeftRightIcon } from 'lucide-react'
import styles from 'styles/number-input.module.css'

export const Scrubber = () => (
  <NumberInput.Root className={styles.Root} defaultValue="32">
    <NumberInput.Label className={styles.Label}>Label</NumberInput.Label>
    <NumberInput.Control className={styles.Control}>
      <NumberInput.Scrubber className={styles.Scrubber}>
        <ArrowLeftRightIcon />
      </NumberInput.Scrubber>
      <NumberInput.Input className={styles.Input} data-has-scrubber />
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
