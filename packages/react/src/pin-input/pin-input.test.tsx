import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { PinInput, PinInputControl, PinInputField, PinInputLabel, type PinInputProps } from './'

const Component = (props: PinInputProps) => (
  <PinInput {...props}>
    <PinInputLabel>Label</PinInputLabel>
    <PinInputControl>
      {[0, 1, 2].map((id, index) => (
        <PinInputField key={id} index={index} />
      ))}
    </PinInputControl>
  </PinInput>
)

describe('PinInput', () => {
  it('should have the proper aria labels', async () => {
    render(<Component />)
    expect(screen.queryAllByLabelText('pin code 1 of 3')).toHaveLength(1)
    expect(screen.queryAllByLabelText('pin code 2 of 3')).toHaveLength(1)
    expect(screen.queryAllByLabelText('pin code 3 of 3')).toHaveLength(1)
  })

  it('should autofocus the first input', async () => {
    render(<Component autoFocus />)
    await waitFor(() => expect(screen.getByLabelText('pin code 1 of 3')).toHaveFocus())
  })

  it('should move focus to the next item when enter a value', async () => {
    render(<Component />)

    await user.type(screen.getByLabelText('pin code 1 of 3'), '1')
    await waitFor(() => expect(screen.getByLabelText('pin code 2 of 3')).toHaveFocus())

    await user.type(screen.getByLabelText('pin code 2 of 3'), '2')
    await waitFor(() => expect(screen.getByLabelText('pin code 3 of 3')).toHaveFocus())
  })

  it('should clear the previous input when pressing backspace', async () => {
    render(<Component />)

    await user.type(screen.getByLabelText('pin code 1 of 3'), '1')
    await user.type(screen.getByLabelText('pin code 2 of 3'), '2')

    await waitFor(() => expect(screen.getByLabelText('pin code 3 of 3')).toHaveFocus())

    fireEvent.keyDown(screen.getByLabelText('pin code 3 of 3'), { key: 'Backspace' })

    await waitFor(() => expect(screen.getByLabelText('pin code 2 of 3')).toHaveFocus())
    expect(screen.getByLabelText('pin code 2 of 3')).toHaveValue('')
  })

  it('should invoke onComplete when all inputs are filled out', async () => {
    const onComplete = vi.fn()
    render(<Component onComplete={onComplete} />)

    await user.type(screen.getByLabelText('pin code 1 of 3'), '1')
    await user.type(screen.getByLabelText('pin code 2 of 3'), '2')
    await user.type(screen.getByLabelText('pin code 3 of 3'), '3')

    expect(onComplete).toHaveBeenCalledWith({ value: ['1', '2', '3'], valueAsString: '123' })
  })

  it('should set one-time-code for autocomplete on fields', async () => {
    render(<Component otp />)

    expect(screen.getByLabelText('pin code 1 of 3')).toHaveAttribute(
      'autocomplete',
      'one-time-code',
    )
    expect(screen.getByLabelText('pin code 2 of 3')).toHaveAttribute(
      'autocomplete',
      'one-time-code',
    )
    expect(screen.getByLabelText('pin code 3 of 3')).toHaveAttribute(
      'autocomplete',
      'one-time-code',
    )
  })

  it('should replace last input calls onComplete correctly', async () => {
    const onComplete = vi.fn()
    render(<Component onComplete={onComplete} />)

    const input1 = screen.getByLabelText('pin code 1 of 3')
    const input2 = screen.getByLabelText('pin code 2 of 3')
    const input3 = screen.getByLabelText('pin code 3 of 3')

    await user.type(input1, '1')
    await user.type(input2, '2')
    await user.type(input3, '3')

    await waitFor(() =>
      expect(onComplete).toHaveBeenCalledWith({ value: ['1', '2', '3'], valueAsString: '123' }),
    )
    onComplete.mockClear()

    await user.type(input3, '{selectall}{backspace}')
    await waitFor(() => expect(input3).toHaveValue(''))

    await user.type(input3, '3')
    await waitFor(() =>
      expect(onComplete).toHaveBeenCalledWith({ value: ['1', '2', '3'], valueAsString: '123' }),
    )
  })
})
