import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Editable, type EditableProps } from './'

const ComponentUnderTest = (props: EditableProps) => (
  <Editable.Root placeholder="Placeholder" {...props}>
    {(api) => (
      <>
        <Editable.Label>Label</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Control>
          {api().isEditing ? (
            <>
              <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
              <Editable.CancelTrigger>Canvel</Editable.CancelTrigger>
            </>
          ) : (
            <Editable.EditTrigger>Edit</Editable.EditTrigger>
          )}
        </Editable.Control>
      </>
    )}
  </Editable.Root>
)

describe('Editable', () => {
  it('should render', async () => {
    render(() => <ComponentUnderTest />)
  })

  it('should be possible to focus the placeholder and enter a value', async () => {
    render(() => <ComponentUnderTest />)
    screen.getByText('Placeholder').focus()
    await user.type(screen.getByLabelText('editable input'), 'React')

    expect(await screen.findByText('React')).toBeInTheDocument()
  })

  it('should be possible to dbl click the placeholder to enter a value', async () => {
    render(() => <ComponentUnderTest activationMode="dblclick" />)
    await user.dblClick(screen.getByText('Placeholder'))
    const input = screen.getByRole('textbox')

    await user.clear(input)
    await user.type(input, 'React')

    expect(await screen.findByText('React')).toBeInTheDocument()
  })

  it('should be possible to edit an existing value', async () => {
    render(() => <ComponentUnderTest activationMode="dblclick" value="React" />)

    await user.dblClick(screen.getByText('React'))

    const input = screen.getByRole('textbox')
    await user.clear(input)
    await user.type(input, 'Solid')
    await user.click(screen.getByText('Save'))

    await waitFor(() => expect(screen.queryByText('Solid')).toBeInTheDocument())
  })

  it('should be possible to hide input if click EditableCancelTrigger ', async () => {
    render(() => <ComponentUnderTest activationMode="dblclick" />)

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
