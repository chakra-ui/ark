import { Switch } from '../..'

export const RenderProp = () => (
  <Switch.Root>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Context>
      {(context) => (
        <Switch.Label>Feature is {context().isChecked ? 'enabled' : 'disabled'}</Switch.Label>
      )}
    </Switch.Context>
  </Switch.Root>
)
