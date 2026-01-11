import { Switch } from '@ark-ui/react/switch'
import styles from 'styles/switch.module.css'

export const Basic = () => (
  <Switch.Root className={styles.Root}>
    <Switch.Control className={styles.Control}>
      <Switch.Thumb className={styles.Thumb} />
    </Switch.Control>
    <Switch.Label className={styles.Label}>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
)
