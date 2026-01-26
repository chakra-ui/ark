import { Checkbox } from '@ark-ui/react/checkbox'
import { Fieldset } from '@ark-ui/react/fieldset'
import { CheckIcon } from 'lucide-react'
import checkbox from 'styles/checkbox.module.css'
import styles from 'styles/fieldset.module.css'

export const WithCheckbox = () => {
  return (
    <Fieldset.Root className={styles.Root}>
      <Fieldset.Legend className={styles.Legend}>Email Preferences</Fieldset.Legend>

      <Checkbox.Root className={checkbox.Root} defaultChecked>
        <Checkbox.Control className={checkbox.Control}>
          <Checkbox.Indicator className={checkbox.Indicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label className={checkbox.Label}>Product updates</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>

      <Checkbox.Root className={checkbox.Root}>
        <Checkbox.Control className={checkbox.Control}>
          <Checkbox.Indicator className={checkbox.Indicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label className={checkbox.Label}>Marketing emails</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Fieldset.Root>
  )
}
