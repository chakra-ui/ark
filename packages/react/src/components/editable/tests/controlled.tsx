import { Editable } from '../'

export const ControlledComponentUnderTest = (props: Editable.RootProps) => (
  <Editable.Root placeholder="Placeholder" {...props}>
    <Editable.Context>
      {(editable) => (
        <>
          <Editable.Label>Label</Editable.Label>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
          <Editable.Control>
            {editable.editing ? (
              <>
                <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
                <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
              </>
            ) : (
              <Editable.EditTrigger>Edit</Editable.EditTrigger>
            )}
          </Editable.Control>
        </>
      )}
    </Editable.Context>
  </Editable.Root>
)
