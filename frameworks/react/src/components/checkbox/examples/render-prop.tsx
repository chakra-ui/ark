import { Checkbox } from '../..'

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
