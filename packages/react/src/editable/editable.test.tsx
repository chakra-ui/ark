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
  <Editable placeholder="Placeholder" {...props}>
    {({ isEditing }) => (
      <>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControl>
          {isEditing ? (
            <>
              <EditableSubmitTrigger>Save</EditableSubmitTrigger>
              <EditableCancelTrigger>Cancel</EditableCancelTrigger>
            </>
          ) : (
            <EditableEditTrigger>Edit</EditableEditTrigger>
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

  it('should be possible to focus the placeholder and enter a value', async () => {
    render(<ComponentUnderTest />)
    screen.getByText('Placeholder').focus()
    await user.type(screen.getByLabelText('editable input'), 'React')

    expect(await screen.findByText('React')).toBeInTheDocument()
  })

  it('should be possible to dbl click the placeholder to enter a value', async () => {
    render(<ComponentUnderTest activationMode="dblclick" />)
    await user.dblClick(screen.getByText('Placeholder'))
    await user.type(screen.getByLabelText('editable input'), 'React')

    expect(await screen.findByText('React')).toBeInTheDocument()
  })

  it('should be possible to edit an existing value', async () => {
    render(<ComponentUnderTest activationMode="dblclick" defaultValue="React" />)

    await user.dblClick(screen.getByText('React'))

    const input = screen.getByRole('textbox')
    await user.clear(input)
    await user.type(input, 'Solid')
    await user.click(screen.getByText('Save'))

    expect(await screen.findByText('Solid')).toBeInTheDocument()
  })

  it('should be possible to hide input if click EditableCancelTrigger ', async () => {
    render(<ComponentUnderTest activationMode="dblclick" />)

    await user.dblClick(screen.getByText('Placeholder'))

    const input = screen.getByRole('textbox')
    expect(input).not.toHaveAttribute('hidden', '')

    const editableCancelTriggerButton = screen.getByRole('button', {
      name: 'cancel',
    })

    await user.click(editableCancelTriggerButton)

    expect(input).toHaveAttribute('hidden', '')
  })
})
