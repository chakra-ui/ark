import { Index } from 'solid-js'
import { PinInput } from '../'

export const ComponentUnderTest = (props: PinInput.RootProps) => (
  <PinInput.Root {...props}>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
)
