import { NumberInput, useNumberInput } from '@ark-ui/react/number-input'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import styles from 'styles/number-input.module.css'

export const RootProvider = () => {
  const numberInput = useNumberInput()
  return (
    <div className="stack">
      <output>valueAsNumber: {numberInput.valueAsNumber}</output>
      <NumberInput.RootProvider className={styles.Root} value={numberInput}>
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
      </NumberInput.RootProvider>
    </div>
  )
}
