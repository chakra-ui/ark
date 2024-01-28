import { PinInput, type PinInputRootProps } from '../'

export const ComponentUnderTest = (props: PinInputRootProps) => (
  <PinInput.Root {...props}>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      {[0, 1, 2].map((id, index) => (
        <PinInput.Input key={id} index={index} />
      ))}
    </PinInput.Control>
  </PinInput.Root>
)
