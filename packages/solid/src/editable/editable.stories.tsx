import {
  Editable,
  EditableArea,
  EditableCancelButton,
  EditableControls,
  EditableEditButton,
  EditableInput,
  EditablePreview,
  EditableSubmitButton,
} from '.'

export const Basic = () => (
  <Editable activationMode="dblclick" placeholder="enter a value" value="Chakra">
    {(state) => (
      <>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls>
          {state().isEditing ? (
            <>
              <EditableSubmitButton>Save</EditableSubmitButton>
              <EditableCancelButton>Cancel</EditableCancelButton>
            </>
          ) : (
            <EditableEditButton>Edit</EditableEditButton>
          )}
        </EditableControls>
      </>
    )}
  </Editable>
)
