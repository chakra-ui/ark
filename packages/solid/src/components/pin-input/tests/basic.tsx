import { Field } from '@ark-ui/solid/field'
import { Index } from 'solid-js'
import { PinInput } from '../index.tsx'

export const ComponentUnderTest = (props: Partial<PinInput.RootProps>) => (
  <PinInput.Root count={3} {...props}>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} />}</Index>
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
)

export const PinInputWithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <PinInput.Root count={3}>
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
