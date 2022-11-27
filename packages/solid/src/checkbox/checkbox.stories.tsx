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
