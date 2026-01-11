import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-solid'
import styles from 'styles/checkbox.module.css'

export const Indeterminate = () => (
  <Checkbox.Root class={styles.Root} checked="indeterminate">
    <Checkbox.Control class={styles.Control}>
      <Checkbox.Indicator class={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator class={styles.Indicator} indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label class={styles.Label}>Checkbox</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)
