import { Field } from '@ark-ui/solid/field'
import { Switch } from '../'

export const ComponentUnderTest = (props: Switch.RootProps) => {
  return (
    <Switch.Root {...props}>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
}

export const SwitchWithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <Switch.Root>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
