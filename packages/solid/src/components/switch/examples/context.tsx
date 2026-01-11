import { Switch } from '@ark-ui/solid/switch'
import styles from 'styles/switch.module.css'

export const Context = () => (
  <Switch.Root class={styles.Root}>
    <Switch.Control class={styles.Control}>
      <Switch.Thumb class={styles.Thumb} />
    </Switch.Control>
    <Switch.Context>
      {(context) => (
        <Switch.Label class={styles.Label}>Feature is {context().checked ? 'enabled' : 'disabled'}</Switch.Label>
      )}
    </Switch.Context>
    <Switch.HiddenInput />
  </Switch.Root>
)
