import {
  Editable,
  EditableArea,
  EditableCancelButton,
  EditableControls,
  EditableEditButton,
  EditableInput,
  EditablePreview,
  EditableSubmitButton,
} from '@atlas/react'
import { useState } from 'react'

export const basic = () => {
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
