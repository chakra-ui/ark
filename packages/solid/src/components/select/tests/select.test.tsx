import { selectAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Select } from '../'
import { getExports, getParts } from '../../../setup-test'
import { WithField } from '../examples/with-field'
import { ComponentUnderTest } from './basic'

describe('Select', () => {
  it.each(getParts(selectAnatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(selectAnatomy))('should export %s', async (part) => {
    expect(Select[part]).toBeDefined()
  })

  it.skip('should handle item selection', async () => {
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

  it.skip('should call onValueChange when item is selected', async () => {
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

  it.skip('should be able to lazy mount and unmount its items', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: 'Framework' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: 'Framework' }))
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
  })
})

describe('Select / Field', () => {
  // it('should set combobox as required', async () => {
  //   render(() => <WithField required />)
  //   screen.debug()
  //   expect(screen.getAllByRole('combobox', { hidden: true })[1]).toBeRequired()
  // })
  // it('should set input as disabled', async () => {
  //   render(() => <WithField disabled />)
  //   expect(screen.getByRole('combobox')).toBeDisabled()
  // })
  it('should set input as readonly', async () => {
    render(() => <WithField readOnly />)
    expect(screen.getByRole('combobox')).toHaveAttribute('data-readonly')
  })
  it('should display helper text', async () => {
    render(() => <WithField />)
    expect(screen.getByText('Additional Info')).toBeInTheDocument()
  })
  it('should display error text when error is present', async () => {
    render(() => <WithField invalid />)
    expect(screen.getByText('Error Info')).toBeInTheDocument()
  })
  it('should focus on input when label is clicked', async () => {
    render(() => <WithField />)
    await user.click(screen.getByText(/label/i))
    expect(screen.getByRole('combobox', { name: /label/i })).toHaveFocus()
  })
  it('should not display error text when no error is present', async () => {
    render(() => <WithField />)
    expect(screen.queryByText('Error Info')).not.toBeInTheDocument()
  })
})
