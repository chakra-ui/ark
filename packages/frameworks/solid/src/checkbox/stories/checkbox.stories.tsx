import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Checkbox, type CheckedState } from '../'
import './checkbox.css'

type CheckboxType = typeof Checkbox

const meta: Meta<CheckboxType> = {
  title: 'Checkbox',
  component: Checkbox,
}

export default meta

export const Basic = () => (
  <Checkbox.Root>
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control />
    <Checkbox.Indicator>Indicator</Checkbox.Indicator>
  </Checkbox.Root>
)

export const Controlled = () => {
  const [checked, setChecked] = createSignal<CheckedState>(true)
  return (
    <Checkbox.Root checked={checked()} onCheckedChange={(e) => setChecked(e.checked)}>
      <Checkbox.Label>Checkbox</Checkbox.Label>
      <Checkbox.Control />
    </Checkbox.Root>
  )
}

export const Indeterminate = () => (
  <Checkbox.Root checked="indeterminate">
    <Checkbox.Label>Checkbox</Checkbox.Label>
    <Checkbox.Control />
  </Checkbox.Root>
)

export const RenderProp = () => (
  <Checkbox.Root>
    {(api) => (
      <>
        <Checkbox.Label>Checkbox</Checkbox.Label>
        <Checkbox.Control>
          {api().isChecked && <span>✓</span>}
          {api().isIndeterminate && <span>-</span>}
        </Checkbox.Control>
      </>
    )}
  </Checkbox.Root>
)
