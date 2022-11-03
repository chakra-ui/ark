import { useState } from 'react'
import { Editable } from './editable'
import { EditableArea } from './editable-area'
import { EditableCancelButton } from './editable-cancel-button'
import { EditableControls } from './editable-controls'
import { EditableEditButton } from './editable-edit-button'
import { EditableInput } from './editable-input'
import { EditablePreview } from './editable-preview'
import { EditableSubmitButton } from './editable-submit-button'

export const Basic = () => {
  const [value, setValue] = useState('')
  return (
    <Editable
      activationMode="dblclick"
      placeholder="enter a value"
      value={value}
      onChange={({ value }) => setValue(value)}
    >
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
