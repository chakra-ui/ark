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

const ComponentUnderTest = (props: Omit<EditableProps, 'children'>) => (
  <Editable activationMode="dblclick" placeholder="Placeholder" {...props}>
    {({ isEditing }) => (
      <>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls>
          {isEditing ? (
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

describe('Editable', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })

  it('should be possible to dbl click the placeholder to enter a value', async () => {
    render(<ComponentUnderTest />)
    await user.dblClick(screen.getByText('Placeholder'))
    await user.type(screen.getByLabelText('editable input'), 'React')
    await user.click(screen.getByText('Save'))

    expect(await screen.findByText('React')).toBeInTheDocument()
  })

  it('should be possible to edit a value', async () => {
    render(<ComponentUnderTest defaultValue="React" />)

    await user.dblClick(screen.getByText('React'))

    const input = screen.getByRole('textbox')
    await user.clear(input)
    await user.type(input, 'Solid')
    await user.click(screen.getByText('Save'))

    expect(await screen.findByText('Solid')).toBeInTheDocument()
  })
})
