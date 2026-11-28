import { fireEvent, render, screen, waitFor } from '@testing-library/svelte'
import user from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import ComponentUnderTest from './combobox.test.svelte'
import ComboboxWithField from './combobox-with-field.test.svelte'

const settle = () => new Promise((resolve) => setTimeout(resolve))

describe('Combobox', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(ComponentUnderTest)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should show options on click', async () => {
    render(ComponentUnderTest)
    expect(await screen.findByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()

    await fireEvent.click(screen.getByText('Open'))

    await waitFor(() => expect(screen.getByText('Open')).toHaveAttribute('aria-expanded', 'true'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())
  })

  it('should handle item selection', async () => {
    render(ComponentUnderTest)

    await fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    await fireEvent.click(screen.getByRole('option', { name: 'React' }))
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('React'))
  })

  it('should call onValueChange when item is selected', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })

    await fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    await fireEvent.click(screen.getByRole('option', { name: 'React' }))
    await waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1))
    expect(onValueChange).toHaveBeenCalledWith(expect.objectContaining({ value: ['react'] }))
  })

  it('should open menu when onOpenChange is called', async () => {
    const onOpenChange = vi.fn()
    render(ComponentUnderTest, { props: { onOpenChange } })

    await fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
    expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: true }))
  })

  it('should be read-only when readOnly is true', async () => {
    const onOpenChange = vi.fn()
    render(ComponentUnderTest, { props: { readOnly: true, onOpenChange } })

    await user.click(screen.getByText('Open'))

    expect(screen.getByRole('combobox')).toHaveAttribute('readonly')
    expect(screen.getByText('Open')).toHaveAttribute('aria-expanded', 'false')
    expect(await screen.findByText('React')).not.toBeVisible()
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('should be able to lazy mount its items', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })
    await settle()
    expect(screen.queryByText('React')).not.toBeInTheDocument()

    await fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.queryByTestId('positioner')).toBeVisible())
    expect(screen.getByRole('option', { name: 'React' })).toBeVisible()
  })

  it('should be able to lazy mount and unmount its items', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })
    await settle()
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await fireEvent.click(screen.getByText('Open'))
    expect(await screen.findByTestId('positioner')).toBeInTheDocument()

    await fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })
})

describe('Combobox / Field', () => {
  it('should set combobox as required', async () => {
    render(ComboboxWithField, { props: { required: true } })
    expect(await screen.findByRole('combobox', { name: /label/i })).toBeRequired()
  })

  it('should set combobox as disabled', async () => {
    render(ComboboxWithField, { props: { disabled: true } })
    expect(await screen.findByRole('combobox', { name: /label/i })).toBeDisabled()
  })

  it('should set combobox as readonly', async () => {
    render(ComboboxWithField, { props: { readOnly: true } })
    expect(await screen.findByRole('combobox', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(ComboboxWithField)
    expect(await screen.findByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(ComboboxWithField, { props: { invalid: true } })
    expect(await screen.findByText('Error Info')).toBeVisible()
    expect(screen.getByRole('combobox', { name: /label/i })).toHaveAttribute('aria-invalid', 'true')
  })

  it('should focus on combobox when label is clicked', async () => {
    render(ComboboxWithField)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('combobox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(ComboboxWithField)
    await screen.findByRole('combobox', { name: /label/i })
    expect(screen.getByText('Error Info')).not.toBeVisible()
  })
})
