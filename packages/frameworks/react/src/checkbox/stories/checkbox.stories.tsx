import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Checkbox, type CheckboxCheckedState } from '../'
import './checkbox.css'

const meta: Meta = {
  title: 'Checkbox',
}

export default meta

export const Basic = () => (
  <Checkbox.Root defaultChecked>
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control />
    <Checkbox.Indicator>Indicator</Checkbox.Indicator>
  </Checkbox.Root>
)

export const Controlled = () => {
  const [checked, setChecked] = useState<CheckboxCheckedState>(true)
  return (
    <Checkbox.Root checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      <Checkbox.Label>Checkbox</Checkbox.Label>
      <Checkbox.Control />
    </Checkbox.Root>
  )
}

export const Indeterminate = () => (
  <Checkbox.Root checked="indeterminate">
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control />
  </Checkbox.Root>
)

export const RenderProp = () => (
  <Checkbox.Root>
    {(api) => (
      <>
        <Checkbox.Label>Checkbox</Checkbox.Label>
        <Checkbox.Control>
          {api.isChecked && <span>✓</span>}
          {api.isIndeterminate && <span>-</span>}
        </Checkbox.Control>
      </>
    )}
  </Checkbox.Root>
)
