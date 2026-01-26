import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ComponentUnderTest, PinInputWithField } from './basic'

describe('PinInput', () => {
  it('should have no a11y violations', async () => {
    const { container } = await act(async () => render(<ComponentUnderTest />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should have the proper aria labels', async () => {
    render(<ComponentUnderTest />)

    const [input1, input2, input3] = screen.queryAllByRole('textbox')

    await screen.findByLabelText('pin code 1 of 3')

    expect(input1).toHaveAttribute('aria-label', 'pin code 1 of 3')
    expect(input2).toHaveAttribute('aria-label', 'pin code 2 of 3')
    expect(input3).toHaveAttribute('aria-label', 'pin code 3 of 3')
  })

  it('should autofocus the first input', async () => {
    render(<ComponentUnderTest autoFocus />)

    await waitFor(() => expect(screen.getByLabelText('pin code 1 of 3')).toHaveFocus())
  })

  it('should move focus to the next item when enter a value', async () => {
    render(<ComponentUnderTest />)

    await waitFor(() => expect(screen.getByLabelText('pin code 1 of 3')).toBeInTheDocument())

    await user.type(screen.getByLabelText('pin code 1 of 3'), '1')

    await waitFor(() => expect(screen.getByLabelText('pin code 2 of 3')).toHaveFocus())

    await user.type(screen.getByLabelText('pin code 2 of 3'), '2')
    await waitFor(() => expect(screen.getByLabelText('pin code 3 of 3')).toHaveFocus())
  })

  it('should clear the previous input when pressing backspace', async () => {
    render(<ComponentUnderTest />)

    const [input1, input2, input3] = screen.queryAllByRole('textbox')

    await user.type(input1, '1')
    await user.type(input2, '2')

    await waitFor(() => expect(input3).toHaveFocus())

    fireEvent.keyDown(input3, { key: 'Backspace' })

    await waitFor(() => expect(input2).toHaveFocus())
    expect(input2).toHaveValue('')
  })

  it('should invoke onComplete when all inputs are filled out', async () => {
    const onComplete = vi.fn()
    render(<ComponentUnderTest onValueComplete={onComplete} />)

    const [input1, input2, input3] = screen.queryAllByRole('textbox')

    await user.type(input1, '1')
    await user.type(input2, '2')
    await user.type(input3, '3')

    await waitFor(() => expect(onComplete).toHaveBeenCalledWith({ value: ['1', '2', '3'], valueAsString: '123' }))
  })

  it('should set one-time-code for autocomplete on fields', async () => {
    render(<ComponentUnderTest otp />)

    const [input1, input2, input3] = await screen.findAllByRole('textbox')

    expect(input1).toHaveAttribute('autocomplete', 'one-time-code')
    expect(input2).toHaveAttribute('autocomplete', 'one-time-code')
    expect(input3).toHaveAttribute('autocomplete', 'one-time-code')
  })

  it('should replace last input calls onComplete correctly', async () => {
    const onComplete = vi.fn()
    render(<ComponentUnderTest onValueComplete={onComplete} />)

    const [input1, input2, input3] = screen.queryAllByRole('textbox')

    await user.type(input1, '1')
    await user.type(input2, '2')
    await user.type(input3, '3')

    await waitFor(() => expect(onComplete).toHaveBeenCalledWith({ value: ['1', '2', '3'], valueAsString: '123' }))
    onComplete.mockClear()

    await user.type(input3, '{selectall}{backspace}')
    await waitFor(() => expect(input3).toHaveValue(''))

    await user.type(input3, '3')
    await waitFor(() => expect(onComplete).toHaveBeenCalledWith({ value: ['1', '2', '3'], valueAsString: '123' }))
  })
})

describe('PinInput / Field', () => {
  it('should set input as required', async () => {
    render(<PinInputWithField required />)
    expect((await screen.findAllByRole('textbox', { hidden: true }))[3]).toBeRequired()
  })

  it('should set input as disabled', async () => {
    render(<PinInputWithField disabled />)
    expect((await screen.findAllByRole('textbox', { hidden: true }))[3]).toBeDisabled()
  })

  it('should set input as readonly', async () => {
    render(<PinInputWithField readOnly />)
    expect((await screen.findAllByRole('textbox', { hidden: true }))[3]).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(<PinInputWithField />)
    expect(await screen.findByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(<PinInputWithField invalid />)
    await screen.findByText('Error Info')
  })

  it('should focus on input when label is clicked', async () => {
    render(<PinInputWithField />)
    await user.click(await screen.findByText(/label/i))
    expect(screen.getByRole('textbox', { name: /pin code 1 of 3/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    await act(async () => render(<PinInputWithField />))
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
