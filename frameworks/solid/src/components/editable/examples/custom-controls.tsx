import { Editable } from '../..'

export const CustomControls = () => (
  <Editable.Root placeholder="enter a value" value="Chakra">
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Context>
      {(context) => (
        <Editable.Control>
          {context().isEditing ? (
            <>
              <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
              <Editable.CancelTrigger>Canvel</Editable.CancelTrigger>
            </>
          ) : (
            <Editable.EditTrigger>Edit</Editable.EditTrigger>
          )}
        </Editable.Control>
      )}
    </Editable.Context>
  </Editable.Root>
)
