import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { parseColor } from '../'
import { WithField } from '../examples/with-field'
import { ComponentUnderTest } from './basic'

describe('ColorPicker', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should be able to lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeInTheDocument())

    await user.click(screen.getByTestId('trigger'))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.getByTestId('positioner')).toBeVisible())

    await user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })

  it('should render with default value', async () => {
    render(<ComponentUnderTest defaultValue={parseColor('#ff00ff')} />)

    expect(screen.getByTestId('swatch-trigger')).toHaveStyle({
      backgroundColor: 'rgb(255, 0, 255)',
    })
  })
})

describe('Color Picker / Field', () => {
  it('should set color picker as required', async () => {
    render(<WithField required />)
    expect(screen.getByRole('textbox', { name: /label/i })).toBeRequired()
  })

  it('should set color picker as disabled', async () => {
    render(<WithField disabled />)
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
  })

  it('should set color picker as readonly', async () => {
    render(<WithField readOnly />)
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAttribute('readonly')
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
    expect(screen.getByRole('textbox', { name: /hex/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(<WithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
