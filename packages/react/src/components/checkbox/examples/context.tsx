import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'

export const Context = () => (
  <Checkbox.Root className={styles.Root}>
    <Checkbox.Control className={styles.Control}>
      <Checkbox.Indicator className={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Context>
      {(checkbox) => <Checkbox.Label className={styles.Label}>Checked: {String(checkbox.checked)}</Checkbox.Label>}
    </Checkbox.Context>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)
