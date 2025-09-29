import { Field } from '@ark-ui/solid/field'
import { createSignal } from 'solid-js'

export const SelectControlled = () => {
  const [value, setValue] = createSignal('3')

  return (
    <>
      <span>Selected: Option {value()}</span>
      <Field.Root>
        <Field.Label>Label</Field.Label>
        <Field.Select value={value()} onChange={(e) => setValue(e.currentTarget.value)}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </Field.Select>
        <Field.HelperText>Some additional Info</Field.HelperText>
        <Field.ErrorText>Error Info</Field.ErrorText>
      </Field.Root>
    </>
  )
}
