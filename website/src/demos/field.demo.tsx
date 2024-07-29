'use client'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'

export const Demo = () => {
  return (
    <Field.Root>
      <Field.Label>Label</Field.Label>
      <Field.Input type="email" asChild>
        <Input />
      </Field.Input>
      <Field.HelperText>Please enter your E-Mail</Field.HelperText>
      <Field.ErrorText>Error Info</Field.ErrorText>
    </Field.Root>
  )
}
