import { Switch } from '@ark-ui/solid/switch'
import { createSignal } from 'solid-js'

export const Controlled = () => {
  const [checked, setChecked] = createSignal(false)

  return (
    <Switch.Root checked={checked()} onCheckedChange={(e) => setChecked(e.checked)}>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
}
