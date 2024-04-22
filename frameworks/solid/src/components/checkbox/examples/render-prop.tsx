import { Checkbox } from '../..'

export const RenderProp = () => (
  <Checkbox.Root>
    <Checkbox.Context>
      {(context) => (
        <Checkbox.Control>
          {context().checked && <span>✓</span>}
          {context().indeterminate && <span>-</span>}
        </Checkbox.Control>
      )}
    </Checkbox.Context>
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
)
