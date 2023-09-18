import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Checkbox, CheckboxControl, CheckboxLabel, type CheckedState } from './'
import './checkbox.css'

const meta: Meta = {
  title: 'Checkbox',
}

export default meta

export const Basic = () => (
  <Checkbox>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxControl />
  </Checkbox>
)

export const Controlled = () => {
  const [checked, setChecked] = createSignal<CheckedState>(true)
  return (
    <>
      <Checkbox checked={checked()} onCheckedChange={(e) => setChecked(e.checked)}>
        <CheckboxLabel>Checkbox</CheckboxLabel>
        <CheckboxControl />
      </Checkbox>
    </>
  )
}

export const Indeterminate = () => (
  <Checkbox checked="indeterminate">
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxControl />
  </Checkbox>
)

export const RenderProp = () => (
  <Checkbox>
    {(api) => (
      <>
        <CheckboxLabel>Checkbox</CheckboxLabel>
        <CheckboxControl>
          {api().isChecked && <span>✓</span>}
          {api().isIndeterminate && <span>-</span>}
        </CheckboxControl>
      </>
    )}
  </Checkbox>
)
