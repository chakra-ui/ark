import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel, type CheckedState } from '.'
import './checkbox.css'

type CheckboxType = typeof Checkbox

const meta: Meta<CheckboxType> = {
  title: 'Checkbox',
  component: Checkbox,
}

export default meta

export const Basic = () => (
  <Checkbox>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl />
  </Checkbox>
)

export const Controlled = () => {
  const [checked, setChecked] = useState<CheckedState>(true)
  return (
    <>
      <Checkbox checked={checked} onChange={(e) => setChecked(e.checked)}>
        <CheckboxLabel>Checkbox</CheckboxLabel>
        <CheckboxInput />
        <CheckboxControl />
      </Checkbox>
    </>
  )
}

export const Indeterminate = () => (
  <Checkbox checked="indeterminate">
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl />
  </Checkbox>
)

export const RenderProp = () => (
  <Checkbox>
    {(api) => (
      <>
        <CheckboxLabel>Checkbox</CheckboxLabel>
        <CheckboxInput />
        <CheckboxControl>
          {api.isChecked && <span>✓</span>}
          {api.isIndeterminate && <span>-</span>}
        </CheckboxControl>
      </>
    )}
  </Checkbox>
)
