import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { anatomy } from '@zag-js/checkbox'
import { axe } from 'vitest-axe'
import { Checkbox } from '../'
import { getExports, getParts } from '../../../setup-test'
import { WithField } from '../examples/with-field'
import { ComponentUnderTest } from './basic'
import { ControlledComponentUnderTest } from './controlled'

describe('Checkbox / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(anatomy))('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(Checkbox[part]).toBeDefined()
  })
})

describe('Checkbox', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should handle check and unchecked', async () => {
    const onChange = vi.fn()
    render(<ComponentUnderTest onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('should invoke onCheckedChange', async () => {
    const onCheckedChange = vi.fn()
    render(<ComponentUnderTest onCheckedChange={onCheckedChange} />)

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    await waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith({ checked: true }))

    fireEvent.click(checkbox)
    await waitFor(() => expect(onCheckedChange).toHaveBeenCalledWith({ checked: false }))
  })

  it('should handle indeterminate state properly', async () => {
    render(<ComponentUnderTest checked="indeterminate" />)

    expect(screen.getByTestId('control')).toHaveAttribute('data-state', 'indeterminate')
  })

  it('should allow controlled usage', async () => {
    render(<ControlledComponentUnderTest />)

    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()

    await user.click(screen.getByText('set checked'))
    await waitFor(() => expect(checkbox).toBeChecked())
  })
})

describe('Checkbox / Field', () => {
  afterEach(() => {
    cleanup()
  })

  it('should set checkbox as required', async () => {
    render(<WithField required />)
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeRequired()
  })

  it('should set input as disabled', async () => {
    render(<WithField disabled />)
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeDisabled()
  })

  it('should set input as readonly', async () => {
    render(<WithField readOnly />)
    expect(screen.getByText('Label')).toHaveAttribute('data-readonly')
  })

  it('should display helper text', async () => {
    render(<WithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<WithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on input when label is clicked', async () => {
    render(<WithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('checkbox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(<WithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
