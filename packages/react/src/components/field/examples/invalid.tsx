import { Field } from '@ark-ui/react/field'

export const Invalid = () => (
  <Field.Root invalid>
    <Field.Label>Email</Field.Label>
    <Field.Input placeholder="me@example.com" />
    <Field.ErrorText>This is an error text</Field.ErrorText>
  </Field.Root>
)
