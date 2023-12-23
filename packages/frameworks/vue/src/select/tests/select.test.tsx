import { selectAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { vi } from 'vitest'
import { Select } from '../'
import { getExports, getParts } from '../../setup-test'
import ComponentUnderTest from './select.test.vue'

describe('Select', () => {
  it.each(getParts(selectAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(selectAnatomy))('should export %s', async (part) => {
    expect(Select[part]).toBeDefined()
  })

  it('should handle item selection', async () => {
    render(ComponentUnderTest)

    const trigger = screen.getByRole('button', { name: 'Framework' })
    await user.click(trigger)

    const item = screen.getByText('React', { ignore: 'option' })

    await user.click(item)
    await waitFor(() => expect(trigger).toHaveTextContent('React'))
  })

  it('should close on select', async () => {
    render(ComponentUnderTest)

    const trigger = screen.getByRole('button', { name: 'Framework' })
    await user.click(trigger)

    const item = screen.getByText('React', { ignore: 'option' })

    await user.click(item)
    await waitFor(() => expect(screen.queryByText('Frameworks')).not.toBeVisible())
  })

  it('should be disabled when disabled is true', async () => {
    render(ComponentUnderTest, { props: { disabled: true } })

    const trigger = screen.getByRole('button', { name: 'Framework' })

    expect(trigger).toBeDisabled()
  })

  it('should handle multiple selection', async () => {
    render(ComponentUnderTest, { props: { multiple: true } })

    const trigger = screen.getByRole('button', { name: 'Framework' })

    await user.click(trigger)

    const itemReact = screen.getByText('React', { ignore: 'option' })
    const itemVue = screen.getByText('Vue', { ignore: 'option' })

    await user.click(itemReact)
    await user.click(itemVue)
    await waitFor(() => expect(trigger).toHaveTextContent('React, Vue'))
  })

  it('should call onValueChange when item is selected', async () => {
    const onValueChange = vi.fn()
    render(ComponentUnderTest, { props: { onValueChange } })

    const trigger = screen.getByRole('button', { name: 'Framework' })

    await user.click(trigger)

    const item = screen.getByText('React', { ignore: 'option' })

    await user.click(item)
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledTimes(1)
    })
  })

  it('should open menu when onOpenChange is called', async () => {
    const onOpenChange = vi.fn()
    render(ComponentUnderTest, { props: { onOpenChange } })

    const trigger = screen.getByRole('button', { name: 'Framework' })

    await user.click(trigger)
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledTimes(1))
  })

  it('should be read-only when readOnly is true', async () => {
    render(ComponentUnderTest, { props: { readOnly: true } })

    const trigger = screen.getByRole('button', { name: 'Framework' })

    await user.click(trigger)
    await waitFor(() => expect(screen.queryByText('React', { ignore: 'option' })).not.toBeVisible())
  })

  it('should be able to lazy mount its items', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Framework' }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('should be able to lazy mount and unmount its items', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Framework' }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Framework' }))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
