import { Editable, type EditableProps } from '../'

export const ComponentUnderTest = (props: EditableProps) => (
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
