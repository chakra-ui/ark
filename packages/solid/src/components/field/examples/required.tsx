import { Field } from '@ark-ui/solid/field'

export const Required = () => (
  <Field.Root required>
    <Field.Label>
      Label
      <Field.RequiredIndicator>*</Field.RequiredIndicator>
    </Field.Label>
    <Field.Input />
    <Field.HelperText>This field is required</Field.HelperText>
  </Field.Root>
)
