import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from './'
import './switch.css'

type SwitchType = typeof Switch

const meta: Meta<SwitchType> = {
  title: 'Switch',
  component: Switch,
}

export default meta

export const Basic = () => (
  <Switch defaultChecked>
    <SwitchControl>
      <SwitchThumb />
    </SwitchControl>
    <SwitchLabel>Label</SwitchLabel>
  </Switch>
)

export const Controlled = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Switch checked={checked} onChange={(e) => setChecked(e.checked)}>
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchLabel>Label</SwitchLabel>
    </Switch>
  )
}

export const Disabled = () => {
  return (
    <Switch disabled>
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
        <SwitchLabel>Feature is {api.isChecked ? 'enabled' : 'disabled'}</SwitchLabel>
      </>
    )}
  </Switch>
)
