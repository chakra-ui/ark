import { Field } from '@ark-ui/solid/field'

export const CustomControl = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Any Control</Field.Label>
      <Field.Context>{(field) => <input {...field().getInputProps()} />}</Field.Context>
      <Field.HelperText>Uses getControlProps() for maximum flexibility</Field.HelperText>
      <Field.ErrorText>This field has an error</Field.ErrorText>
    </Field.Root>
  )
}
