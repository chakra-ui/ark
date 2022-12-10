import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '.'
import './checkbox.css'

export const Basic = () => (
  <Checkbox>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl />
  </Checkbox>
)

export const Indetermiante = () => (
  <Checkbox indeterminate>
    <CheckboxLabel>Checkbox</CheckboxLabel>
    <CheckboxInput />
    <CheckboxControl />
  </Checkbox>
)
