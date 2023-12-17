import { comboboxAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { getParts } from '../../setup-test'
import ComponentUnderTest from './combobox.test.vue'

describe('Combobox', () => {
  it.each(getParts(comboboxAnatomy))('should render part %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it('should render', async () => {
    render(ComponentUnderTest)
  })

  it('should show options on click', async () => {
    render(ComponentUnderTest)

    expect(screen.getByRole('option', { hidden: true, name: 'React' })).not.toBeVisible()

    await user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())
  })

  it('should handle item selection', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    await user.click(screen.getByRole('option', { name: 'React' }))
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('React'))
  })

  it('should call onValueChange when item is selected', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })

    await user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.getByRole('option', { name: 'React' })).toBeVisible())

    await user.click(screen.getByRole('option', { name: 'React' }))

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should open menu when onOpenChange is called', async () => {
    const onOpenChange = vi.fn()
    render(ComponentUnderTest, { props: { onOpenChange } })

    await user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
  })

  it('should be read-only when readOnly is true', async () => {
    render(ComponentUnderTest, { props: { readOnly: true } })

    await user.click(screen.getByTestId('trigger'))
    await waitFor(() => expect(screen.queryByText('React')).not.toBeVisible())
  })

  it('should be able to lazy mount its items', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('trigger'))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should be able to lazy mount and unmount its items', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('trigger'))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByTestId('trigger'))
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
  })
})
