import { Index } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { PinInput } from './'
import './pin-input.css'

const meta: Meta = {
  title: 'PinInput',
}

export default meta

export const Basic = () => (
  <PinInput.Root placeholder="*" onValueComplete={(e) => console.log(e)}>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
    </PinInput.Control>
  </PinInput.Root>
)
