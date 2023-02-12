import '../checkbox.css'
import { Checkbox, CheckboxControl, CheckboxInput, CheckboxLabel } from '../index'

export const Basic = () => (
  <>
    <Checkbox>
      <CheckboxLabel>Checkbox 1</CheckboxLabel>
      <CheckboxInput />
      <CheckboxControl />
    </Checkbox>

    <Checkbox>
      <CheckboxLabel>Checkbox 2</CheckboxLabel>
      <CheckboxInput />
      <CheckboxControl />
    </Checkbox>
  </>
)
