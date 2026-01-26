import { Editable } from '../'
import { Field } from '../../field'

export const ControlledComponentUnderTest = (props: Editable.RootProps) => (
  <Editable.Root placeholder="Placeholder" {...props}>
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Context>
      {(context) => (
        <Editable.Control>
          {context().editing ? (
            <>
              <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
              <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
            </>
          ) : (
            <Editable.EditTrigger>Edit</Editable.EditTrigger>
          )}
        </Editable.Control>
      )}
    </Editable.Context>
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
