import { Field } from '@ark-ui/solid/field'
import { PinInput } from '@ark-ui/solid/pin-input'
import { For } from 'solid-js'

export const ComponentUnderTest = (props: Partial<PinInput.RootProps>) => (
  <PinInput.Root count={3} {...props}>
    <PinInput.Label>Label</PinInput.Label>
    <PinInput.Control>
      <For each={[0, 1, 2]} keyed={false}>
        {(id) => <PinInput.Input index={id()} />}
      </For>
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
)

export const PinInputWithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <PinInput.Root count={3}>
      <PinInput.Label>Label</PinInput.Label>
      <PinInput.Control>
        <For each={[0, 1, 2]} keyed={false}>
          {(id) => <PinInput.Input index={id()} />}
        </For>
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
