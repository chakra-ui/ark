import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/checkbox.module.css'

export const Controlled = () => {
  const [checked, setChecked] = useState<Checkbox.CheckedState>(true)

  return (
    <Checkbox.Root className={styles.Root} checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      <Checkbox.Control className={styles.Control}>
        <Checkbox.Indicator className={styles.Indicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label className={styles.Label}>Checkbox</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  )
}
