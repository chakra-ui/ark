import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'
import styles from 'styles/checkbox.module.css'

export const Context = () => (
  <Checkbox.Root class={styles.Root}>
    <Checkbox.Control class={styles.Control}>
      <Checkbox.Indicator class={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Context>
      {(checkbox) => <Checkbox.Label class={styles.Label}>Checked: {String(checkbox().checked)}</Checkbox.Label>}
    </Checkbox.Context>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)
