import { Checkbox } from './checkbox'
import { CheckboxControl } from './checkbox-control'
import { CheckboxInput } from './checkbox-input'
import { CheckboxLabel } from './checkbox-label'
import './checkbox.css'

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
