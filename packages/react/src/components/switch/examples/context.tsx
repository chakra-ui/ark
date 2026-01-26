import { Switch } from '@ark-ui/react/switch'
import styles from 'styles/switch.module.css'

export const Context = () => (
  <Switch.Root className={styles.Root}>
    <Switch.Control className={styles.Control}>
      <Switch.Thumb className={styles.Thumb} />
    </Switch.Control>
    <Switch.Context>
      {(context) => (
        <Switch.Label className={styles.Label}>Feature is {context.checked ? 'enabled' : 'disabled'}</Switch.Label>
      )}
    </Switch.Context>
    <Switch.HiddenInput />
  </Switch.Root>
)
