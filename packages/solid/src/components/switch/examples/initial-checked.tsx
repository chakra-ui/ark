import { Switch } from '@ark-ui/solid/switch'
import styles from 'styles/switch.module.css'

export const InitialChecked = () => (
  <Switch.Root class={styles.Root} defaultChecked>
    <Switch.Control class={styles.Control}>
      <Switch.Thumb class={styles.Thumb} />
    </Switch.Control>
    <Switch.Label class={styles.Label}>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
)
