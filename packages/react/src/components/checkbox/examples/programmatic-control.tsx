import { Checkbox, useCheckbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'
import button from 'styles/button.module.css'

export const ProgrammaticControl = () => {
  const checkbox = useCheckbox()

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button type="button" onClick={() => checkbox.setChecked(true)} className={button.Root}>
          Check
        </button>
        <button type="button" onClick={() => checkbox.setChecked(false)} className={button.Root}>
          Uncheck
        </button>
      </div>

      <Checkbox.RootProvider className={styles.Root} value={checkbox}>
        <Checkbox.Control className={styles.Control}>
          <Checkbox.Indicator className={styles.Indicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label className={styles.Label}>Checkbox</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.RootProvider>
    </>
  )
}
