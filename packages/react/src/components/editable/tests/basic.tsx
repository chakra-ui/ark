import { Editable } from '../'
import { Field } from '../../field'

export const ComponentUnderTest = (props: Editable.RootProps) => (
  <Editable.Root placeholder="Placeholder" {...props}>
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Control>
      <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
      <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
      <Editable.EditTrigger>Edit</Editable.EditTrigger>
    </Editable.Control>
  </Editable.Root>
)

export const EditableWithField = (props: Field.RootProps) => (
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
