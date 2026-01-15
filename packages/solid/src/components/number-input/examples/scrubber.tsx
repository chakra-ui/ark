import { NumberInput } from '@ark-ui/solid/number-input'
import { ArrowLeftRightIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-solid'
import styles from 'styles/number-input.module.css'

export const Scrubber = () => (
  <NumberInput.Root class={styles.Root} defaultValue="32">
    <NumberInput.Label class={styles.Label}>Label</NumberInput.Label>
    <NumberInput.Control class={styles.Control}>
      <NumberInput.Scrubber class={styles.Scrubber}>
        <ArrowLeftRightIcon />
      </NumberInput.Scrubber>
      <NumberInput.Input class={styles.Input} data-has-scrubber />
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
