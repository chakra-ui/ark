import { Switch } from '@ark-ui/react/switch'
import { useState } from 'react'
import styles from 'styles/switch.module.css'

export const Controlled = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Switch.Root className={styles.Root} checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      <Switch.Control className={styles.Control}>
        <Switch.Thumb className={styles.Thumb} />
      </Switch.Control>
      <Switch.Label className={styles.Label}>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
}
