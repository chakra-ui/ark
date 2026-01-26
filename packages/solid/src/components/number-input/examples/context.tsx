import { NumberInput } from '@ark-ui/solid/number-input'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-solid'
import styles from 'styles/number-input.module.css'

export const Context = () => (
  <NumberInput.Root class={styles.Root}>
    <NumberInput.Context>
      {(context) => <NumberInput.Label class={styles.Label}>Value: {context().valueAsNumber}</NumberInput.Label>}
    </NumberInput.Context>
    <NumberInput.Control class={styles.Control}>
      <NumberInput.Input class={styles.Input} />
      <div class={styles.TriggerGroup}>
        <NumberInput.IncrementTrigger class={styles.IncrementTrigger}>
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger class={styles.DecrementTrigger}>
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
      </div>
    </NumberInput.Control>
  </NumberInput.Root>
)
