import { editableAnatomy } from '@ark-ui/anatomy'
import { cleanup, render, screen } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Editable } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'
import { ControlledComponentUnderTest } from './controlled'

describe('Editable / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(editableAnatomy))('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(editableAnatomy))('should export %s', async (part) => {
    expect(Editable[part]).toBeDefined()
  })
})

describe('Editable', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render controlled component', async () => {
    render(<ControlledComponentUnderTest />)
  })

  it('should be possible to focus the placeholder and enter a value', async () => {
    render(<ControlledComponentUnderTest />)

    screen.getByText('Placeholder').focus()

    await user.type(screen.getByLabelText('editable input'), 'React')
    expect(await screen.findByText('React')).toBeInTheDocument()
  })

  it('should be possible to dbl click the placeholder to enter a value', async () => {
    render(<ControlledComponentUnderTest activationMode="dblclick" />)

    await user.dblClick(screen.getByText('Placeholder'))
    await user.clear(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), 'React')

    await screen.findByText('React')
  })

  it('should be possible to edit an existing value', async () => {
    render(<ControlledComponentUnderTest activationMode="dblclick" defaultValue="React" />)

    await user.dblClick(screen.getByText('React'))
    await user.clear(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), 'Solid')
    await user.click(screen.getByText('Save'))

    await screen.findByText('Solid')
  })

  it('should be possible to hide input if click EditableCancelTrigger ', async () => {
    render(<ControlledComponentUnderTest activationMode="dblclick" />)

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
