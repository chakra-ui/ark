import { Switch, useSwitch } from '@ark-ui/react/switch'
import button from 'styles/button.module.css'
import styles from 'styles/switch.module.css'

export const RootProvider = () => {
  const _switch = useSwitch()

  return (
    <div className="stack">
      <button className={button.Root} onClick={() => _switch.toggleChecked()}>
        Toggle
      </button>

      <Switch.RootProvider className={styles.Root} value={_switch}>
        <Switch.Control className={styles.Control}>
          <Switch.Thumb className={styles.Thumb} />
        </Switch.Control>
        <Switch.Label className={styles.Label}>Label</Switch.Label>
        <Switch.HiddenInput />
      </Switch.RootProvider>
    </div>
  )
}
