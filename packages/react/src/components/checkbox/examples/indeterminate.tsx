import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'

export const Indeterminate = () => (
  <Checkbox.Root className={styles.Root} checked="indeterminate">
    <Checkbox.Control className={styles.Control}>
      <Checkbox.Indicator className={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator className={styles.Indicator} indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label className={styles.Label}>Checkbox</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
)
