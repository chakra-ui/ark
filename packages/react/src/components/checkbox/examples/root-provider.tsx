import { Checkbox, useCheckbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'

export const RootProvider = () => {
  const checkbox = useCheckbox()

  return (
    <Checkbox.RootProvider className={styles.Root} value={checkbox}>
      <Checkbox.Control className={styles.Control}>
        <Checkbox.Indicator className={styles.Indicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label className={styles.Label}>Checkbox</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.RootProvider>
  )
}
