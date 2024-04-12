import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Checkbox } from '../'
import './checkbox.css'

const meta: Meta = {
  title: 'Components / Checkbox',
}

export default meta

export const Basic = () => (
  <Checkbox.Root>
    <Checkbox.Control />
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
)

export const Controlled = () => {
  const [checked, setChecked] = createSignal<Checkbox.CheckedState>(true)
  return (
    <Checkbox.Root checked={checked()} onCheckedChange={(e) => setChecked(e.checked)}>
      <Checkbox.Control />
      <Checkbox.Label>Checkbox</Checkbox.Label>
    </Checkbox.Root>
  )
}

export const Indeterminate = () => (
  <Checkbox.Root checked="indeterminate">
    <Checkbox.Control />
    <Checkbox.Label>Checkbox</Checkbox.Label>
  </Checkbox.Root>
)

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
