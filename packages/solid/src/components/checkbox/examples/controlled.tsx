import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/checkbox.module.css'

export const Controlled = () => {
  const [checked, setChecked] = createSignal<Checkbox.CheckedState>(true)
  return (
    <Checkbox.Root class={styles.Root} checked={checked()} onCheckedChange={(e) => setChecked(e.checked)}>
      <Checkbox.Control class={styles.Control}>
        <Checkbox.Indicator class={styles.Indicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label class={styles.Label}>Checkbox</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  )
}
