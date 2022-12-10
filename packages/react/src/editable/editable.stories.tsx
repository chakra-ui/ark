import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmitTrigger,
} from './'

export const Basic = () => (
  <Editable placeholder="Placeholder">
    <EditableLabel>Label</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
  </Editable>
)

export const CustomControls = () => (
  <Editable activationMode="dblclick" placeholder="enter a value" defaultValue="Chakra">
    {(state) => (
      <>
        <EditableLabel>Label</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControl>
          {state.isEditing ? (
            <>
              <EditableSubmitTrigger>
                <button>Save</button>
              </EditableSubmitTrigger>
              <EditableCancelTrigger>
                <button>Cancel</button>
              </EditableCancelTrigger>
            </>
          ) : (
            <EditableEditTrigger>
              <button>Edit</button>
            </EditableEditTrigger>
          )}
        </EditableControl>
      </>
    )}
  </Editable>
)
