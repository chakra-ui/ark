import { comboboxAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Combobox } from '../'
import { getExports, getParts } from '../../../setup-test'
import { WithField } from '../examples/with-field'
import { ComponentUnderTest } from './basic'

describe('Combobox', () => {
  it.each(getParts(comboboxAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(comboboxAnatomy))('should export %s', async (part) => {
    expect(Combobox[part]).toBeDefined()
  })

  it('should show options on click', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()
    fireEvent.click(screen.getByTestId('trigger'))

    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())
  })

  it('should handle item selection', async () => {
    render(() => <ComponentUnderTest />)

    fireEvent.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    await user.click(screen.getByRole('option', { name: 'React' }))

    await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('React'))
  })

  it('should call onValueChange when item is selected', async () => {
    const onValueChange = vi.fn()
    render(() => <ComponentUnderTest onValueChange={onValueChange} />)

    fireEvent.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    await user.click(screen.getByRole('option', { name: 'React' }))

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should open menu when onOpenChange is called', async () => {
    const onOpenChange = vi.fn()
    render(() => <ComponentUnderTest onOpenChange={onOpenChange} />)
    fireEvent.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
  })

  it('should be read-only when readOnly is true', async () => {
    render(() => <ComponentUnderTest readOnly />)
    fireEvent.click(screen.getByTestId('trigger'))

    await waitFor(() => expect(screen.queryByText('React')).not.toBeVisible())
  })

  it('should be able to lazy mount its items', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('trigger'))
    expect(await screen.findByTestId('positioner')).toBeInTheDocument()
  })

  it('should be able to lazy mount and unmount its items', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('trigger'))
    expect(await screen.findByTestId('positioner')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })
})

describe('Combobox / Field', () => {
  it('should set combobox as required', async () => {
    render(() => <WithField required />)
    expect(screen.getByRole('combobox', { name: /label/i })).toBeRequired()
  })

  it('should set combobox as disabled', async () => {
    render(() => <WithField disabled />)
    expect(screen.getByRole('combobox', { name: /label/i })).toBeDisabled()
  })

  it('should set combobox as readonly', async () => {
    render(() => <WithField readOnly />)
    expect(screen.getByRole('combobox', { name: /label/i })).toHaveAttribute('readonly')
  })

  it('should display helper text', async () => {
    render(() => <WithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })

  it('should display error text when error is present', async () => {
    render(() => <WithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })

  it('should focus on combobox when label is clicked', async () => {
    render(() => <WithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('combobox', { name: /label/i })).toHaveFocus()
  })

  it('should not display error text when no error is present', async () => {
    render(() => <WithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
