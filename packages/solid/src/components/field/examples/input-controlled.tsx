import { Field } from '@ark-ui/solid/field'
import { createSignal } from 'solid-js'

export const InputControlled = () => {
  const [value, setValue] = createSignal('Input is controlled')

  return (
    <>
      <span>Input text: {value()}</span>
      <Field.Root>
        <Field.Label>Label</Field.Label>
        <Field.Input value={value()} onInput={(e) => setValue(e.currentTarget.value)} />
        <Field.HelperText>Some additional Info</Field.HelperText>
        <Field.ErrorText>Error Info</Field.ErrorText>
      </Field.Root>
    </>
  )
}
