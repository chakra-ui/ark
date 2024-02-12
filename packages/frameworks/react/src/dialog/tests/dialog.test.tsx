import { dialogAnatomy } from '@ark-ui/anatomy'
// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, render, screen } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Dialog } from '../'
import { getExports, getParts } from '../../setup-test'
import { ComponentUnderTest } from './basic'

describe('Dialog / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(dialogAnatomy))('should render part! %s', async (part) => {
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(dialogAnatomy))('should export %s', async (part) => {
    expect(Dialog[part]).toBeDefined()
  })
})

describe('Dialog', () => {
  afterEach(() => {
    cleanup()
  })

  it('should show dialog content when opened', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('Open Dialog'))
    expect(await screen.findByText('Dialog Title')).toBeVisible()

    await user.click(screen.getByText('Close'))
    expect(await screen.findByText('Dialog Title')).not.toBeVisible()
  })

  it('should invoke onOpenChange if dialog is closed', async () => {
    const onOpenChange = vi.fn()
    render(<ComponentUnderTest open onOpenChange={onOpenChange} />)

    await user.click(screen.getByText('Close'))
    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it('should be able to lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(<ComponentUnderTest lazyMount />)

    expect(screen.getByRole('button', { name: 'Open Dialog' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
  })
})
