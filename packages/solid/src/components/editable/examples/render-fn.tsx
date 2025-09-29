import { Editable } from '@ark-ui/solid/editable'

export const RenderFn = () => (
  <Editable.Root placeholder="-">
    <Editable.Context>
      {(editable) => <Editable.Label>Value is {editable().valueText}</Editable.Label>}
    </Editable.Context>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Control>
      <Editable.EditTrigger>Edit</Editable.EditTrigger>
      <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
      <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
    </Editable.Control>
  </Editable.Root>
)
