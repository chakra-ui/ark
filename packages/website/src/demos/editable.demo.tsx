import { Button, Editable, Label, type EditableProps } from '~/components/ui'

export const Demo = (props: EditableProps) => {
  return (
    <Editable.Root
      placeholder="Your favorite Framework"
      defaultValue="Double click to edit"
      activationMode="dblclick"
      {...props}
    >
      {(state) => (
        <>
          <Editable.Label asChild>
            <Label>Framework</Label>
          </Editable.Label>
          <Editable.Area>
            <Editable.Input />
            <Editable.Preview />
          </Editable.Area>
          <Editable.Control>
            {state.isEditing ? (
              <>
                <Editable.SubmitTrigger asChild>
                  <Button variant="link">Save</Button>
                </Editable.SubmitTrigger>
                <Editable.CancelTrigger asChild>
                  <Button variant="link">Cancel</Button>
                </Editable.CancelTrigger>
              </>
            ) : (
              <Editable.EditTrigger asChild>
                <Button variant="link">Edit</Button>
              </Editable.EditTrigger>
            )}
          </Editable.Control>
        </>
      )}
    </Editable.Root>
  )
}
