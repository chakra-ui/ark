import { Field } from '@ark-ui/react/field'

export const Select = () => {
  return (
    <Field.Root>
      <Field.Label>Label</Field.Label>
      <Field.Select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Field.Select>
      <Field.HelperText>Some additional Info</Field.HelperText>
      <Field.ErrorText>Error Info</Field.ErrorText>
    </Field.Root>
  )
}
