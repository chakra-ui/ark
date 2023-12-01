import { pinInputAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { vi } from 'vitest'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './pin-input.test.vue'

describe('PinInput', () => {
  it.each(getParts(pinInputAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should have the proper aria labels', async () => {
    render(ComponentUnderTest)
    expect(screen.queryAllByLabelText('pin code 1 of 3')).toHaveLength(1)
    expect(screen.queryAllByLabelText('pin code 2 of 3')).toHaveLength(1)
    expect(screen.queryAllByLabelText('pin code 3 of 3')).toHaveLength(1)
  })

  it('should autofocus the first input', async () => {
    render(ComponentUnderTest, { props: { autoFocus: true } })
    await waitFor(() => expect(screen.getByLabelText('pin code 1 of 3')).toHaveFocus())
  })

  it('should move focus to the next item when enter a value', async () => {
    render(ComponentUnderTest)

    await user.type(screen.getByLabelText('pin code 1 of 3'), '1')
    await waitFor(() => expect(screen.getByLabelText('pin code 2 of 3')).toHaveFocus())

    await user.type(screen.getByLabelText('pin code 2 of 3'), '2')
    await waitFor(() => expect(screen.getByLabelText('pin code 3 of 3')).toHaveFocus())
  })

  it('should clear the previous input when pressing backspace', async () => {
    render(ComponentUnderTest)

    await user.type(screen.getByLabelText('pin code 1 of 3'), '1')
    await user.type(screen.getByLabelText('pin code 2 of 3'), '2')

    await waitFor(() => expect(screen.getByLabelText('pin code 3 of 3')).toHaveFocus())

    fireEvent.keyDown(screen.getByLabelText('pin code 3 of 3'), { key: 'Backspace' })

    await waitFor(() => expect(screen.getByLabelText('pin code 2 of 3')).toHaveFocus())
    expect(screen.getByLabelText('pin code 2 of 3')).toHaveValue('')
  })

  it('should invoke onValueComplete when all inputs are filled out', async () => {
    const onValueComplete = vi.fn()
    render(ComponentUnderTest, { props: { onValueComplete } })

    await user.type(screen.getByLabelText('pin code 1 of 3'), '1')
    await user.type(screen.getByLabelText('pin code 2 of 3'), '2')
    await user.type(screen.getByLabelText('pin code 3 of 3'), '3')

    await waitFor(() =>
      expect(onValueComplete).toHaveBeenCalledWith({
        value: ['1', '2', '3'],
        valueAsString: '123',
      }),
    )
  })

  it('should set one-time-code for autocomplete on fields', async () => {
    render(ComponentUnderTest, { props: { otp: true } })

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

  it('should replace last input calls onValueComplete correctly', async () => {
    const onValueComplete = vi.fn()
    render(ComponentUnderTest, { props: { onValueComplete } })

    const input1 = screen.getByLabelText('pin code 1 of 3')
    const input2 = screen.getByLabelText('pin code 2 of 3')
    const input3 = screen.getByLabelText('pin code 3 of 3')

    await user.type(input1, '1')
    await user.type(input2, '2')
    await user.type(input3, '3')

    await waitFor(() =>
      expect(onValueComplete).toHaveBeenCalledWith({
        value: ['1', '2', '3'],
        valueAsString: '123',
      }),
    )
    onValueComplete.mockClear()

    await user.type(input3, '{selectall}{backspace}')
    await waitFor(() => expect(input3).toHaveValue(''))

    await user.type(input3, '3')
    await waitFor(() =>
      expect(onValueComplete).toHaveBeenCalledWith({
        value: ['1', '2', '3'],
        valueAsString: '123',
      }),
    )
  })
})
