import { editableAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { getExports, getParts } from '../setup-test'
import { Editable, type EditableRootProps } from './'

const ComponentUnderTest = (props: EditableRootProps) => (
  <Editable.Root placeholder="Placeholder" {...props}>
    <Editable.Label>Label</Editable.Label>
    <Editable.Area>
      <Editable.Input />
      <Editable.Preview />
    </Editable.Area>
    <Editable.Control>
      <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
      <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
      <Editable.EditTrigger>Edit</Editable.EditTrigger>
    </Editable.Control>
  </Editable.Root>
)

const ControlledComponentUnderTest = (props: EditableRootProps) => (
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
              <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
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
  it.each(getParts(editableAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(editableAnatomy))('should export %s', async (part) => {
    expect(Editable[part]).toBeDefined()
  })

  it('should render controlled component', async () => {
    render(() => <ControlledComponentUnderTest />)
  })

  it('should be possible to focus the placeholder and enter a value', async () => {
    render(() => <ControlledComponentUnderTest />)
    screen.getByText('Placeholder').focus()
    await user.type(screen.getByLabelText('editable input'), 'React')

    expect(await screen.findByText('React')).toBeInTheDocument()
  })

  it('should be possible to dbl click the placeholder to enter a value', async () => {
    render(() => <ControlledComponentUnderTest activationMode="dblclick" />)
    await user.dblClick(screen.getByText('Placeholder'))

    await user.clear(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), 'React', { delay: 20 })

    expect(screen.findByText('React')).toBeInTheDocument()
  })

  it('should be possible to edit an existing value', async () => {
    render(() => <ControlledComponentUnderTest activationMode="dblclick" value="React" />)

    await user.dblClick(screen.getByText('React'))

    await user.clear(screen.getByRole('textbox'))

    await user.type(screen.getByRole('textbox'), 'Solid', { delay: 20 })
    await user.click(screen.getByText('Save'))

    expect(screen.findByText('Solid')).toBeInTheDocument()
  })

  it('should be possible to hide input if click EditableCancelTrigger ', async () => {
    render(() => <ControlledComponentUnderTest activationMode="dblclick" />)

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
