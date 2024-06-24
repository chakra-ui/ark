import { Index } from 'solid-js'
import { Field, PinInput } from '../..'

export const WithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <PinInput.Root>
      <PinInput.Label>Label</PinInput.Label>
      <PinInput.Control>
        <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
