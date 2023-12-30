import { dialogAnatomy } from '@ark-ui/anatomy'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Portal } from '../portal'
import { getExports, getParts } from '../setup-test'
import { Dialog, type DialogProps } from './'

const ComponentUnderTest = (props: DialogProps) => (
  <Dialog.Root {...props}>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner data-testid="positioner">
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)

describe('Dialog', () => {
  it.each(getParts(dialogAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(dialogAnatomy))('should export %s', async (part) => {
    expect(Dialog[part]).toBeDefined()
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
