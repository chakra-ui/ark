import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { vi } from 'vitest'
import CascadeSelectWithField from './field.test.vue'
import ComponentUnderTest from './cascade-select.test.vue'

describe('CascadeSelect', () => {
  it('should open panel on trigger click', async () => {
    render(ComponentUnderTest)

    const trigger = screen.getByRole('combobox', { name: 'Category' })
    await user.click(trigger)

    await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Fruits' })).toBeInTheDocument())
    expect(screen.getByRole('treeitem', { name: 'Vegetables' })).toBeInTheDocument()
  })

  it('should navigate to child panel on branch item click', async () => {
    render(ComponentUnderTest)

    const trigger = screen.getByRole('combobox', { name: 'Category' })
    await user.click(trigger)

    await user.click(screen.getByRole('treeitem', { name: 'Fruits' }))
    await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Apple' })).toBeInTheDocument())
    expect(screen.getByRole('treeitem', { name: 'Banana' })).toBeInTheDocument()
  })

  it('should select a leaf item and display it in the trigger', async () => {
    render(ComponentUnderTest)

    const trigger = screen.getByRole('combobox', { name: 'Category' })
    await user.click(trigger)

    await user.click(screen.getByRole('treeitem', { name: 'Fruits' }))
    await user.click(screen.getByRole('treeitem', { name: 'Apple' }))

    await waitFor(() => expect(trigger).toHaveTextContent('Apple'))
  })

  it('should call onValueChange when a leaf item is selected', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })

    const trigger = screen.getByRole('combobox', { name: 'Category' })
    await user.click(trigger)

    await user.click(screen.getByRole('treeitem', { name: 'Fruits' }))
    await user.click(screen.getByRole('treeitem', { name: 'Apple' }))

    await waitFor(() => expect(onValueChange).toHaveBeenCalledTimes(1))
  })

  it('should call onOpenChange when opened', async () => {
    const onOpenChange = vi.fn()
    render(ComponentUnderTest, { props: { onOpenChange } })

    const trigger = screen.getByRole('combobox', { name: 'Category' })
    await user.click(trigger)

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
  })

  it('should be disabled when disabled is true', async () => {
    render(ComponentUnderTest, { props: { disabled: true } })

    const trigger = screen.getByRole('combobox', { name: 'Category' })
    expect(trigger).toBeDisabled()
  })

  it('should be read-only when readOnly is true', async () => {
    render(ComponentUnderTest, { props: { readOnly: true } })

    const trigger = screen.getByRole('combobox', { name: 'Category' })
    await user.click(trigger)

    await waitFor(() => expect(screen.queryByRole('treeitem', { name: 'Fruits' })).not.toBeInTheDocument())
  })

  it('should be able to lazy mount its panel', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: 'Category' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should be able to lazy mount and unmount its panel', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: 'Category' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: 'Category' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })
})

describe('CascadeSelect / Field', () => {
  it('should set trigger as disabled', async () => {
    render(CascadeSelectWithField, { props: { disabled: true } })
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('should set trigger as readonly', async () => {
    render(CascadeSelectWithField, { props: { readOnly: true } })
    expect(screen.getByRole('combobox')).toHaveAttribute('data-readonly')
  })

  it('should display helper text', async () => {
    render(CascadeSelectWithField)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(CascadeSelectWithField, { props: { invalid: true } })
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on trigger when label is clicked', async () => {
    render(CascadeSelectWithField)
    await user.click(screen.getByText(/label/i))
    await waitFor(() => expect(screen.getByRole('combobox', { name: /label/i })).toHaveFocus())
  })

  it('should not display error text when no error is present', async () => {
    render(CascadeSelectWithField)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
