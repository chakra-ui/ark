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

export const Basic = () => {
  return (
    <Editable activationMode="dblclick" placeholder="enter a value" value="Chakra">
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls>
        {({ isEditing }) =>
          isEditing ? (
            <>
              <EditableSubmitButton>Save</EditableSubmitButton>
              <EditableCancelButton>Cancel</EditableCancelButton>
            </>
          ) : (
            <EditableEditButton>Edit</EditableEditButton>
          )
        }
      </EditableControls>
    </Editable>
  )
}
