import { Checkbox } from '@ark-ui/solid/checkbox'
import { Fieldset } from '@ark-ui/solid/fieldset'
import { CheckIcon } from 'lucide-solid'
import checkbox from 'styles/checkbox.module.css'
import styles from 'styles/fieldset.module.css'

export const WithCheckbox = () => {
  return (
    <Fieldset.Root class={styles.Root}>
      <Fieldset.Legend class={styles.Legend}>Email Preferences</Fieldset.Legend>

      <Checkbox.Root class={checkbox.Root} defaultChecked>
        <Checkbox.Control class={checkbox.Control}>
          <Checkbox.Indicator class={checkbox.Indicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label class={checkbox.Label}>Product updates</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>

      <Checkbox.Root class={checkbox.Root}>
        <Checkbox.Control class={checkbox.Control}>
          <Checkbox.Indicator class={checkbox.Indicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label class={checkbox.Label}>Marketing emails</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </Fieldset.Root>
  )
}
