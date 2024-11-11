import { Field } from '@ark-ui/react/field'

export const Textarea = () => {
  return (
    <Field.Root>
      <Field.Label>Label</Field.Label>
      <Field.Textarea autoresize />
      <Field.HelperText>Some additional Info</Field.HelperText>
      <Field.ErrorText>Error Info</Field.ErrorText>
    </Field.Root>
  )
}
