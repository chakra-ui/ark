import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Switch } from '../'

const meta: Meta = {
  title: 'Components / Switch',
}

export default meta

export const Basic = () => (
  <Switch.Root>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
  </Switch.Root>
)

export const InitialValue = () => (
  <Switch.Root checked>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
    <Switch.Label>Label</Switch.Label>
  </Switch.Root>
)

export const Controlled = () => {
  const [checked, setChecked] = createSignal(false)

  return (
    <Switch.Root checked={checked()} onCheckedChange={(e) => setChecked(e.checked)}>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
    </Switch.Root>
  )
}

export const Disabled = () => {
  return (
    <Switch.Root disabled>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
    </Switch.Root>
  )
}

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
