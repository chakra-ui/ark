import { Checkbox, useCheckbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'
import styles from 'styles/checkbox.module.css'
import button from 'styles/button.module.css'

export const RootProvider = () => {
  const checkbox = useCheckbox()

  return (
    <div class="vstack">
      <Checkbox.RootProvider class={styles.Root} value={checkbox}>
        <Checkbox.Control class={styles.Control}>
          <Checkbox.Indicator class={styles.Indicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label class={styles.Label}>Checkbox</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.RootProvider>

      {checkbox().checked ? (
        <button type="button" onClick={() => checkbox().setChecked(false)} class={button.Root}>
          Uncheck
        </button>
      ) : (
        <button type="button" onClick={() => checkbox().setChecked(true)} class={button.Root}>
          Check
        </button>
      )}
    </div>
  )
}
