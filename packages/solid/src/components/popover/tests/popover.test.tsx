import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { anatomy } from '@zag-js/popover'
import { Popover } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'
import { ControlledComponentUnderTest } from './controlled'

describe('Popover', () => {
  it.each(getParts(anatomy))('should render part! %s', async (part) => {
    render(() => <ComponentUnderTest />)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(Popover[part]).toBeDefined()
  })

  it('should open and close the popover', async () => {
    render(() => <ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByText('close'))
    await waitFor(() => expect(screen.queryByText('title')).not.toBeVisible())
  })

  it.skip('should hide the popover when escape is pressed', async () => {
    render(() => <ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    await waitFor(() => expect(screen.queryByText('title')).not.toBeVisible())

    await user.keyboard('[Escape]')
    await waitFor(() => expect(screen.queryByText('title')).not.toBeVisible())
  })

  it('should focus the first focusable element', async () => {
    render(() => <ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should allow controlled usage', async () => {
    render(() => <ControlledComponentUnderTest />)
    expect(screen.queryByText('title')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.queryByText('title')).toBeVisible()

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    await waitFor(() => expect(screen.queryByText('title')).not.toBeVisible())
  })

  it('should be able to lazy mount', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'click me' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'close' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(() => <ComponentUnderTest lazyMount />)
    expect(screen.getByRole('button', { name: 'click me' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'click me' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'close' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })
})
