import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from '../'
import './checkbox.css'

const meta: Meta = {
  title: 'Components / Checkbox',
}

export default meta

export const Basic = () => (
  <Checkbox.Root defaultChecked>
    <Checkbox.Control />
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
)

export const Controlled = () => {
  const [checked, setChecked] = useState<Checkbox.CheckedState>(true)
  return (
    <Checkbox.Root checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      <Checkbox.Control />
      <Checkbox.Label>Checkbox</Checkbox.Label>
    </Checkbox.Root>
  )
}

export const Indeterminate = () => (
  <Checkbox.Root checked="indeterminate">
    <Checkbox.Control />
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
)

export const RenderProp = () => (
  <Checkbox.Root>
    <Checkbox.Context>
      {(checkbox) => (
        <Checkbox.Control>
          {checkbox.isChecked && <span>✓</span>}
          {checkbox.isIndeterminate && <span>-</span>}
        </Checkbox.Control>
      )}
    </Checkbox.Context>
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
)
