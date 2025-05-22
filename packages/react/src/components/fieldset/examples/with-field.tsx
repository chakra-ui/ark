import { Field } from '@ark-ui/react/field'
import { Fieldset } from '@ark-ui/react/fieldset'

export const WithField = () => {
  return (
    <Fieldset.Root>
      <Fieldset.Legend>Legend</Fieldset.Legend>
      <Fieldset.HelperText>Fieldset Helper Text</Fieldset.HelperText>
      <Fieldset.ErrorText>Fieldset Error Text</Fieldset.ErrorText>
      <Field.Root>
        <Field.Label>Label</Field.Label>
        <Field.Input />
        <Field.HelperText>Field Helper Text</Field.HelperText>
        <Field.ErrorText>Field Error Text</Field.ErrorText>
      </Field.Root>
    </Fieldset.Root>
  )
}
