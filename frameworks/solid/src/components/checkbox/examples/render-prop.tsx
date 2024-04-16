import { Checkbox } from '../..'

export const RenderProp = () => (
  <Checkbox.Root>
    <Checkbox.Context>
      {(context) => (
        <Checkbox.Control>
          {context().isChecked && <span>✓</span>}
          {context().isIndeterminate && <span>-</span>}
        </Checkbox.Control>
      )}
    </Checkbox.Context>
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
)
