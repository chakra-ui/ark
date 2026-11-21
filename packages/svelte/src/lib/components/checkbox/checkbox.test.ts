import { render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import ControlledComponentUnderTest from './tests/checkbox-controlled.test.svelte'
import WithField from './tests/checkbox-field.test.svelte'
import WithGroup from './tests/checkbox-group.test.svelte'
import ComponentUnderTest from './tests/checkbox.test.svelte'

describe('Checkbox', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('should toggle when clicked', async () => {
    render(ComponentUnderTest)
    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(screen.getByTestId('control')).toHaveAttribute('data-state', 'checked')

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
    expect(screen.getByTestId('control')).toHaveAttribute('data-state', 'unchecked')
  })

  it('should invoke onCheckedChange', async () => {
    const onCheckedChange = vi.fn()
    render(ComponentUnderTest, { props: { onCheckedChange } })

    await user.click(screen.getByText('Checkbox'))
    expect(onCheckedChange).toHaveBeenCalledWith({ checked: true })
  })

  it('should set the merged data attributes', () => {
    render(ComponentUnderTest)

    expect(screen.getByTestId('control')).toHaveAttribute('data-checkbox-control')
    expect(screen.getByText('Checkbox')).toHaveAttribute('data-checkbox-label')
  })

  it('should handle the indeterminate state', () => {
    render(ComponentUnderTest, { props: { checked: 'indeterminate' } })

    expect(screen.getByTestId('control')).toHaveAttribute('data-state', 'indeterminate')
    expect(screen.getByText('-')).toBeVisible()
    expect(screen.getByText('✓')).not.toBeVisible()
  })

  it('should follow and write back bind:checked', async () => {
    render(ControlledComponentUnderTest)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()

    await user.click(screen.getByText('set checked'))
    await waitFor(() => expect(checkbox).toBeChecked())

    await user.click(checkbox)
    await waitFor(() => expect(screen.getByTestId('checked')).toHaveTextContent('false'))
  })
})

describe('Checkbox / Field', () => {
  it('should set the checkbox as required', () => {
    render(WithField, { props: { required: true } })
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeRequired()
  })

  it('should set the checkbox as disabled', () => {
    render(WithField, { props: { disabled: true } })
    expect(screen.getByRole('checkbox', { name: /label/i })).toBeDisabled()
  })

  it('should set the checkbox as read only', () => {
    render(WithField, { props: { readOnly: true } })
    expect(screen.getByText('Label')).toHaveAttribute('data-readonly')
  })

  it('should describe the checkbox with the helper text', async () => {
    render(WithField)
    await waitFor(async () =>
      expect(screen.getByRole('checkbox', { name: /label/i })).toHaveAccessibleDescription('Additional Info'),
    )
  })

  it('should show the error text only when invalid', () => {
    const { unmount } = render(WithField)
    expect(screen.getByText('Error Info')).not.toBeVisible()
    unmount()

    render(WithField, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /label/i })).toHaveAttribute('aria-invalid', 'true')
  })

  it('should focus the checkbox when the label is clicked', async () => {
    render(WithField)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('checkbox', { name: /label/i })).toHaveFocus()
  })
})

describe('Checkbox / Group', () => {
  it('should allow an individual checkbox to be disabled', () => {
    render(WithGroup)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).not.toBeDisabled()
    expect(checkboxes[1]).toBeDisabled()
    expect(checkboxes[2]).not.toBeDisabled()
  })
})
