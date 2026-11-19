import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import BindableComponentUnderTest from './tests/number-input-bindable.test.svelte'
import WithField from './tests/number-input-field.test.svelte'
import ComponentUnderTest from './tests/number-input.test.svelte'

describe('NumberInput', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('should step with the triggers and invoke onValueChange', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { step: 5, defaultValue: 0, onValueChange } })
    const input = screen.getByRole('textbox')

    await user.click(screen.getByText('+1'))
    await waitFor(() => expect(input).toHaveValue('5'))
    expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: 5, formattedValue: '5' }))

    await user.click(screen.getByText('-1'))
    await waitFor(() => expect(input).toHaveValue('0'))
  })

  it('should step with the arrow keys and use largeStep with Shift', async () => {
    render(ComponentUnderTest, { props: { defaultValue: 5 } })
    const input = screen.getByRole('textbox')

    input.focus()
    await user.keyboard('[ArrowUp]')
    await waitFor(() => expect(input).toHaveValue('6'))

    await user.keyboard('{Shift>}[ArrowUp]{/Shift}')
    await waitFor(() => expect(input).toHaveValue('16'))
  })

  it('should use smallStep with Alt held', async () => {
    render(ComponentUnderTest, { props: { defaultValue: 5, smallStep: 0.5 } })
    const input = screen.getByRole('textbox')

    input.focus()
    await user.keyboard('{Alt>}[ArrowUp]{/Alt}')
    await waitFor(() => expect(input).toHaveValue('5.5'))
  })

  it('should clamp an out-of-range value on blur', async () => {
    render(ComponentUnderTest, { props: { min: 0, max: 10, defaultValue: 15 } })
    const input = screen.getByRole('textbox')

    await user.click(input)
    await user.tab()

    await waitFor(() => expect(input).toHaveValue('10'))
  })

  it('should keep an out-of-range value when allowOutOfRange is set', () => {
    render(ComponentUnderTest, { props: { allowOutOfRange: true, max: 10, defaultValue: 15 } })

    expect(screen.getByRole('textbox')).toHaveValue('15')
  })

  it('should disable the increment trigger at max', () => {
    render(ComponentUnderTest, { props: { max: 10, defaultValue: 10 } })

    expect(screen.getByText('+1')).toBeDisabled()
    expect(screen.getByText('-1')).not.toBeDisabled()
  })

  it('should set the merged data attributes', () => {
    render(ComponentUnderTest)

    expect(screen.getByRole('textbox')).toHaveAttribute('data-number-input-input')
    expect(screen.getByTestId('control')).toHaveAttribute('data-number-input-control')
    expect(screen.getByText('+1')).toHaveAttribute('data-number-input-increment-trigger')
  })

  it('should follow and write back bind:value', async () => {
    render(BindableComponentUnderTest)
    const input = screen.getByRole('textbox')

    expect(input).toHaveValue('3')

    await user.click(screen.getByText('set 8'))
    await waitFor(() => expect(input).toHaveValue('8'))

    await user.click(screen.getByText('+1'))
    await waitFor(() => expect(screen.getByTestId('value')).toHaveTextContent('9'))
  })
})

describe('NumberInput / Field', () => {
  it('should set the input as required', () => {
    render(WithField, { props: { required: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeRequired()
  })

  it('should set the input as disabled', () => {
    render(WithField, { props: { disabled: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toBeDisabled()
  })

  it('should set the input as read only', () => {
    render(WithField, { props: { readOnly: true } })
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should describe the input with the helper text', () => {
    render(WithField)
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAccessibleDescription('Additional Info')
  })

  it('should show the error text only when invalid', () => {
    const { unmount } = render(WithField)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
    unmount()

    render(WithField, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveAttribute('aria-invalid', 'true')
  })

  it('should focus the input when the label is clicked', async () => {
    render(WithField)
    await user.click(screen.getByText('Label'))
    expect(screen.getByRole('textbox', { name: /label/i })).toHaveFocus()
  })
})
