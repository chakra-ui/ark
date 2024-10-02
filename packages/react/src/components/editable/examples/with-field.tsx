import { Editable } from '@ark-ui/react/editable'
import { Field } from '@ark-ui/react/field'

export const WithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <Editable.Root placeholder="Placeholder" activationMode="dblclick">
      <Editable.Label>Label</Editable.Label>
      <Editable.Area>
        <Editable.Input />
        <Editable.Preview />
      </Editable.Area>
    </Editable.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
