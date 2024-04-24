import { Checkbox } from '../..'

export const RenderProp = () => (
  <Checkbox.Root>
    <Checkbox.Context>
      {(checkbox) => (
        <Checkbox.Control>
          {checkbox.checked && <span>✓</span>}
          {checkbox.indeterminate && <span>-</span>}
        </Checkbox.Control>
      )}
    </Checkbox.Context>
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
)
