import { createSignal } from 'solid-js'
import { Checkbox } from '../..'

export const Controlled = () => {
  const [checked, setChecked] = createSignal<Checkbox.CheckedState>(true)
  return (
    <Checkbox.Root checked={checked()} onCheckedChange={(e) => setChecked(e.checked)}>
      <Checkbox.Control />
      <Checkbox.Label>Checkbox</Checkbox.Label>
    </Checkbox.Root>
  )
}
