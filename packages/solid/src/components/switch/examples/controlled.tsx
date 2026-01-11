import { Switch } from '@ark-ui/solid/switch'
import { createSignal } from 'solid-js'
import styles from 'styles/switch.module.css'

export const Controlled = () => {
  const [checked, setChecked] = createSignal(false)

  return (
    <Switch.Root class={styles.Root} checked={checked()} onCheckedChange={(e) => setChecked(e.checked)}>
      <Switch.Control class={styles.Control}>
        <Switch.Thumb class={styles.Thumb} />
      </Switch.Control>
      <Switch.Label class={styles.Label}>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
}
