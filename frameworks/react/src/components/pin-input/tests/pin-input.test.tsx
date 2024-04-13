import { pinInputAnatomy } from '@ark-ui/anatomy'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { PinInput } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('PinInput / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(pinInputAnatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(pinInputAnatomy))('should export %s', async (part) => {
    expect(PinInput[part]).toBeDefined()
  })
})

describe('PinInput', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have the proper aria labels', async () => {
    render(<ComponentUnderTest />)

    expect(screen.queryAllByLabelText('pin code 1 of 3')).toHaveLength(1)
    expect(screen.queryAllByLabelText('pin code 2 of 3')).toHaveLength(1)
    expect(screen.queryAllByLabelText('pin code 3 of 3')).toHaveLength(1)
  })

  it('should autofocus the first input', async () => {
    render(<ComponentUnderTest autoFocus />)

    await waitFor(() => expect(screen.getByLabelText('pin code 1 of 3')).toHaveFocus())
  })

  it('should move focus to the next item when enter a value', async () => {
    render(<ComponentUnderTest />)

    await user.type(screen.getByLabelText('pin code 1 of 3'), '1')
    await waitFor(() => expect(screen.getByLabelText('pin code 2 of 3')).toHaveFocus())

    await user.type(screen.getByLabelText('pin code 2 of 3'), '2')
    await waitFor(() => expect(screen.getByLabelText('pin code 3 of 3')).toHaveFocus())
  })

  it('should clear the previous input when pressing backspace', async () => {
    render(<ComponentUnderTest />)

    await user.type(screen.getByLabelText('pin code 1 of 3'), '1')
    await user.type(screen.getByLabelText('pin code 2 of 3'), '2')

    await waitFor(() => expect(screen.getByLabelText('pin code 3 of 3')).toHaveFocus())

    fireEvent.keyDown(screen.getByLabelText('pin code 3 of 3'), { key: 'Backspace' })

    await waitFor(() => expect(screen.getByLabelText('pin code 2 of 3')).toHaveFocus())
    expect(screen.getByLabelText('pin code 2 of 3')).toHaveValue('')
  })

  it('should invoke onComplete when all inputs are filled out', async () => {
    const onComplete = vi.fn()
    render(<ComponentUnderTest onValueComplete={onComplete} />)

    await user.type(screen.getByLabelText('pin code 1 of 3'), '1')
    await user.type(screen.getByLabelText('pin code 2 of 3'), '2')
    await user.type(screen.getByLabelText('pin code 3 of 3'), '3')

    await waitFor(() =>
      expect(onComplete).toHaveBeenCalledWith({ value: ['1', '2', '3'], valueAsString: '123' }),
    )
  })

  it('should set one-time-code for autocomplete on fields', async () => {
    render(<ComponentUnderTest otp />)

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
    render(<ComponentUnderTest onValueComplete={onComplete} />)

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
