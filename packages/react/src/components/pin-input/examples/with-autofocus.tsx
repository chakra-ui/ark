import { PinInput } from '@ark-ui/react/pin-input'

export const WithAutofocus = () => (
  <PinInput.Root autoFocus>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
      <PinInput.Input index={2} />
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
)
