import { Checkbox } from '../..'

export const RenderProp = () => (
  <Checkbox.Root>
      {(context) => (
      <>
        <Checkbox.Control>
            {context.isChecked && <span>✓</span>}
            {context.isIndeterminate && <span>-</span>}
          </Checkbox.Control>
          <Checkbox.Label>Checkbox</Checkbox.Label>
        </>
      )}

  </Checkbox.Root>
)
