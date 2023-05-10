import type { Meta } from 'storybook-solidjs'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from './'
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

export const RenderProp = () => (
  <Checkbox>
    {(state) => (
      <>
        <CheckboxLabel>Checkbox</CheckboxLabel>
        <CheckboxInput data-peer />
        <CheckboxControl>
          {state().isChecked && <span>✓</span>}
          {state().isIndeterminate && <span>-</span>}
        </CheckboxControl>
      </>
    )}
  </Checkbox>
)
