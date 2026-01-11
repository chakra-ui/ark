import { Checkbox } from '@ark-ui/solid/checkbox'
import { Field } from '@ark-ui/solid/field'
import { CheckIcon, MinusIcon } from 'lucide-solid'

export const CheckboxWithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <Checkbox.Root>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
        <Checkbox.Indicator indeterminate>
          <MinusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Label</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
