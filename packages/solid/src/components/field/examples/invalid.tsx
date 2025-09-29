import { Field } from '@ark-ui/solid/field'

export const Invalid = () => (
  <Field.Root invalid>
    <Field.Label>Label</Field.Label>
    <Field.Input />
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
