import { Checkbox } from '@ark-ui/react/checkbox'
import { Field } from '@ark-ui/react/field'
import { Fieldset } from '@ark-ui/react/fieldset'

export const WithCheckbox = () => {
  return (
    <Fieldset.Root>
      <Fieldset.Legend>Legend</Fieldset.Legend>
      <Fieldset.HelperText>Fieldset Helper Text</Fieldset.HelperText>
      <Fieldset.ErrorText>Fieldset Error Text</Fieldset.ErrorText>
      <Field.Root>
        <Checkbox.Root>
          <Checkbox.Label>Label</Checkbox.Label>
          <Checkbox.Control>
            <Checkbox.Indicator>✔️</Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
        <Field.HelperText>Field Heler Text</Field.HelperText>
        <Field.ErrorText>Field Error Text</Field.ErrorText>
      </Field.Root>
    </Fieldset.Root>
  )
}
