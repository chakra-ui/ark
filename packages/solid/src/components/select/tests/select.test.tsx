import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { SelectWithField } from './field'
import { ComponentUnderTest } from './basic'

describe('Select', () => {
  it('should handle item selection', async () => {
    render(() => <ComponentUnderTest />)
    const trigger = screen.getByRole('combobox', { name: 'Framework' })
    await user.click(trigger)

    const item = screen.getByText('React', { ignore: 'option' })
    await user.click(item)
    await waitFor(() => expect(trigger).toHaveTextContent('React'))
  })

  it('should close on select', async () => {
    render(() => <ComponentUnderTest />)

    const trigger = screen.getByRole('combobox', { name: 'Framework' })
    fireEvent.click(trigger)

    const item = screen.getByText('React', { ignore: 'option' })
    fireEvent.click(item)

    await waitFor(() => expect(screen.queryByText('Frameworks')).not.toBeVisible())
  })

  it('should be disabled when disabled is true', async () => {
    render(() => <ComponentUnderTest disabled />)
    const trigger = screen.getByRole('combobox', { name: 'Framework' })

    expect(trigger).toBeDisabled()
  })

  it('should handle multiple selection', async () => {
    render(() => <ComponentUnderTest multiple />)
    const trigger = screen.getByRole('combobox', { name: 'Framework' })
    await user.click(trigger)
    const itemReact = screen.getByText('React', { ignore: 'option' })
    const itemVue = screen.getByText('Vue', { ignore: 'option' })
    await user.click(itemReact)
    await user.click(itemVue)
    await waitFor(() => expect(trigger).toHaveTextContent('React, Vue'))
  })

  it('should call onValueChange when item is selected', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    const trigger = screen.getByRole('combobox', { name: 'Framework' })
    await user.click(trigger)

    const item = screen.getByText('React', { ignore: 'option' })
    await user.click(item)

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should open menu when onOpenChange is called', async () => {
    const onOpenChange = vi.fn()
    render(() => <ComponentUnderTest onOpenChange={onOpenChange} />)
    const trigger = screen.getByRole('combobox', { name: 'Framework' })
    await user.click(trigger)
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
  })

  it('should be read-only when readOnly is true', async () => {
    render(() => <ComponentUnderTest readOnly />)
    const trigger = screen.getByRole('combobox', { name: 'Framework' })
    await user.click(trigger)
    await waitFor(() => expect(screen.queryByText('React', { ignore: 'option' })).not.toBeVisible())
  })

  it('should be able to lazy mount its items', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: 'Framework' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should be able to lazy mount and unmount its items', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: 'Framework' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: 'Framework' }))
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
  })
})

describe('Select / Field', () => {
  it('should set combobox as required', async () => {
    render(() => <SelectWithField required />)
    expect(screen.getAllByRole('combobox', { hidden: true })[1]).toBeRequired()
  })
  it('should set input as disabled', async () => {
    render(() => <SelectWithField disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })
  it('should set input as readonly', async () => {
    render(() => <SelectWithField readOnly />)
    expect(screen.getByRole('combobox')).toHaveAttribute('data-readonly')
  })
  it('should display helper text', async () => {
    render(() => <SelectWithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })
  it('should display error text when error is present', async () => {
    render(() => <SelectWithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })
  it('should focus on input when label is clicked', async () => {
    render(() => <SelectWithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('combobox', { name: /label/i })).toHaveFocus()
  })
  it('should not display error text when no error is present', async () => {
    render(() => <SelectWithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
