import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Editable, EditableProps } from './editable'
import { EditableArea } from './editable-area'
import { EditableCancelButton } from './editable-cancel-button'
import { EditableControls } from './editable-controls'
import { EditableEditButton } from './editable-edit-button'
import { EditableInput } from './editable-input'
import { EditablePreview } from './editable-preview'
import { EditableSubmitButton } from './editable-submit-button'

const ComponentUnderTest = (props: EditableProps) => (
  <Editable activationMode="dblclick" placeholder="Placeholder" {...props}>
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

describe('Editable', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })

  it('should be possible to dbl click the placeholder to enter a value', async () => {
    render(<ComponentUnderTest />)
    await user.dblClick(screen.getByText('Placeholder'))
    await user.type(screen.getByLabelText('editable input'), 'Chakra', { delay: 10 })
    await user.click(screen.getByText('Save'))

    expect(await screen.findByText('Chakra')).toBeInTheDocument()
  })
})
