import { Switch, useSwitch } from '@ark-ui/solid/switch'
import button from 'styles/button.module.css'
import styles from 'styles/switch.module.css'

export const RootProvider = () => {
  const _switch = useSwitch()

  return (
    <div class="stack">
      <button class={button.Root} onClick={() => _switch().toggleChecked()}>
        Toggle
      </button>

      <Switch.RootProvider class={styles.Root} value={_switch}>
        <Switch.Control class={styles.Control}>
          <Switch.Thumb class={styles.Thumb} />
        </Switch.Control>
        <Switch.Label class={styles.Label}>Label</Switch.Label>
        <Switch.HiddenInput />
      </Switch.RootProvider>
    </div>
  )
}
