import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel, type CheckedState } from './'
import './checkbox.css'

const meta: Meta = {
  title: 'Checkbox',
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
  const [checked, setChecked] = createSignal<CheckedState>(true)
  return (
    <>
      <Checkbox checked={checked()} onChange={(e) => setChecked(e.checked)}>
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
          {api().isChecked && <span>✓</span>}
          {api().isIndeterminate && <span>-</span>}
        </CheckboxControl>
      </>
    )}
  </Checkbox>
)
