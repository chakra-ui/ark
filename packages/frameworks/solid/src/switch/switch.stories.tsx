import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Switch } from './'
import './switch.css'

type SwitchType = typeof Switch

const meta: Meta<SwitchType> = {
  title: 'Switch',
  component: Switch,
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
    {(api) => (
      <>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Feature is {api().isChecked ? 'enabled' : 'disabled'}</Switch.Label>
      </>
    )}
  </Switch.Root>
)
