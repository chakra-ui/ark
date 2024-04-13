import { editableAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { getExports, getParts } from '~/setup-test'
import { Editable } from '../'
import { ComponentUnderTest } from './basic'
import { ControlledComponentUnderTest } from './controlled'

describe('Editable', () => {
  it.each(getParts(editableAnatomy))('should render part %s', async (part) => {
    render(() => <ComponentUnderTest />)

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

    await screen.findByText('React')
  })

  it('should be possible to edit an existing value', async () => {
    render(() => <ControlledComponentUnderTest activationMode="dblclick" value="React" />)

    await user.dblClick(screen.getByText('React'))

    await user.clear(screen.getByRole('textbox'))

    await user.type(screen.getByRole('textbox'), 'Solid', { delay: 20 })
    await user.click(screen.getByText('Save'))

    await screen.findByText('Solid')
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
