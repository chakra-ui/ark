import { NumberInput } from '@ark-ui/solid/number-input'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/number-input.module.css'

export const Controlled = () => {
  const [value, setValue] = createSignal('0')

  return (
    <div class="stack">
      <output>Value: {value()}</output>
      <NumberInput.Root class={styles.Root} value={value()} onValueChange={(e) => setValue(e.value)}>
        <NumberInput.Label class={styles.Label}>Label</NumberInput.Label>
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
    </div>
  )
}
