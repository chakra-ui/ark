import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'
import styles from 'styles/checkbox.module.css'

export const Basic = () => (
  <Checkbox.Root class={styles.Root}>
    <Checkbox.Control class={styles.Control}>
      <Checkbox.Indicator class={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label class={styles.Label}>Checkbox</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)
