import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableSubmitTrigger,
  type EditableProps,
} from './'

const ComponentUnderTest = (props: Omit<EditableProps, 'children'>) => (
  <Editable activationMode="dblclick" placeholder="Placeholder" {...props}>
    {({ isEditing }) => (
      <>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControl>
          {isEditing ? (
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

describe('Editable', () => {
  it('should render', async () => {
    render(<ComponentUnderTest />)
  })

  it('should be possible to dbl click the placeholder to enter a value', async () => {
    render(<ComponentUnderTest />)
    await user.dblClick(screen.getByText('Placeholder'))
    await user.type(screen.getByLabelText('editable input'), 'React')

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
