import { comboboxAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/vue'
import { Combobox } from '../'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from './combobox.test.vue'

describe('Combobox', () => {
  it.each(getParts(comboboxAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(comboboxAnatomy))('should export %s', async (part) => {
    expect(Combobox[part]).toBeDefined()
  })

  it('should show options on click', async () => {
    render(ComponentUnderTest)

    expect(screen.getByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()

    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())
  })

  it('should handle item selection', async () => {
    render(ComponentUnderTest)

    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    await user.click(screen.getByRole('option', { name: 'React' }))
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('React'))
  })

  it('should call onValueChange when item is selected', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })

    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    await user.click(screen.getByRole('option', { name: 'React' }))

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should open menu when onOpenChange is called', async () => {
    const onOpenChange = vi.fn()
    render(ComponentUnderTest, { props: { onOpenChange } })

    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
  })

  it('should be read-only when readOnly is true', async () => {
    render(ComponentUnderTest, { props: { readOnly: true } })

    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.queryByText('React')).not.toBeVisible())
  })

  it('should be able to lazy mount its items', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => expect(screen.queryByTestId('positioner')).toBeVisible())
  })

  it('should be able to lazy mount and unmount its items', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Open'))
    expect(await screen.findByTestId('positioner')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Open'))
    await waitForElementToBeRemoved(screen.queryByTestId('positioner'))
  })
})
