import { Switch } from '@ark-ui/solid/switch'
import styles from 'styles/switch.module.css'

export const Basic = () => (
  <Switch.Root class={styles.Root}>
    <Switch.Control class={styles.Control}>
      <Switch.Thumb class={styles.Thumb} />
    </Switch.Control>
    <Switch.Label class={styles.Label}>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
)
