import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'

export const Disabled = () => (
  <Checkbox.Root className={styles.Root} disabled>
    <Checkbox.Control className={styles.Control}>
      <Checkbox.Indicator className={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label className={styles.Label}>Checkbox</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)
