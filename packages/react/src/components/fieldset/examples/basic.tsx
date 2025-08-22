import { Field } from '@ark-ui/react/field'
import { Fieldset } from '@ark-ui/react/fieldset'

export const Basic = () => {
  return (
    <Fieldset.Root>
      <Fieldset.Legend>Legend</Fieldset.Legend>
      <Field.Input type="text" />
      <Fieldset.HelperText>Helper text</Fieldset.HelperText>
      <Fieldset.ErrorText>Error text</Fieldset.ErrorText>
    </Fieldset.Root>
  )
}
