import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from './'
import './switch.css'

type SwitchType = typeof Switch

const meta: Meta<SwitchType> = {
  title: 'Switch',
  component: Switch,
}

export default meta

export const Basic = () => (
  <Switch>
    <SwitchControl>
      <SwitchThumb />
    </SwitchControl>
    <SwitchLabel>Label</SwitchLabel>
  </Switch>
)

export const Controlled = () => {
  const [checked, setChecked] = createSignal(false)
  return (
    <Switch checked={checked()} onCheckedChange={(e) => setChecked(e.checked)}>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>Label</SwitchLabel>
    </Switch>
  )
}

export const RenderProp = () => (
  <Switch>
    {(api) => (
      <>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>Feature is {api().isChecked ? 'enabled' : 'disabled'}</SwitchLabel>
      </>
    )}
  </Switch>
)
