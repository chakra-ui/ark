import { Field } from '@ark-ui/solid/field'

export const RequiredIndicator = () => {
  return (
    <Field.Root required>
      <Field.Label>
        Username
        <Field.RequiredIndicator />
      </Field.Label>
      <Field.Input />
    </Field.Root>
  )
}
