import { Field } from '@ark-ui/solid/field'
import { createSignal } from 'solid-js'

export const TextareaControlled = () => {
  const [value, setValue] = createSignal('This is some text\nthen more text')

  return (
    <>
      <span>Textarea value: {value()}</span>
      <Field.Root>
        <Field.Label>Label</Field.Label>
        <Field.Textarea value={value()} onInput={(e) => setValue(e.currentTarget.value)} />
        <Field.HelperText>Some additional Info</Field.HelperText>
        <Field.ErrorText>Error Info</Field.ErrorText>
      </Field.Root>
    </>
  )
}
