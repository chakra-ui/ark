import { PinInput } from '@ark-ui/solid/pin-input'
import { Index } from 'solid-js'

export const WithAutofocus = () => (
  <PinInput.Root autoFocus>
    <PinInput.Label>PIN (auto-focused)</PinInput.Label>
    <PinInput.Control>
      <Index each={[0, 1, 2, 3]}>{(id) => <PinInput.Input index={id()} />}</Index>
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
)
