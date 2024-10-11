import { Switch } from '@ark-ui/solid/switch'

export const InitialValue = () => (
  <Switch.Root checked>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
)
