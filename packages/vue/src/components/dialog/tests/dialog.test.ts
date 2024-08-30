import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { Dialog, dialogAnatomy } from '../'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from './dialog.test.vue'

describe('Dialog', () => {
  it.each(getParts(dialogAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(dialogAnatomy))('should export %s', async (part) => {
    expect(Dialog[part]).toBeDefined()
  })

  it('should show dialog content when opened', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByText('Open Dialog'))

    await waitFor(async () => expect(await screen.findByText('Dialog Title')).toBeVisible())

    await user.click(screen.getByText('Close'))
    await waitFor(async () => expect(await screen.findByText('Dialog Title')).not.toBeVisible())
  })

  it('should invoke onOpenChange if dialog is closed', async () => {
    const onOpenChange = vi.fn()
    render(ComponentUnderTest, {
      props: {
        open: true,
        onOpenChange,
      },
    })

    await user.click(screen.getByText('Close'))
    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  // it.skip('should open with external trigger', async () => {
  //   render(ControlledComponentUnderTest)

  //   const controlButton = screen.getByText<HTMLButtonElement>('Toggle Dialog')
  //   const dialogPositioner = screen.getByTestId('dialog-Positioner')

  //   expect(dialogPositioner).not.toBeVisible()

  //   await user.click(controlButton)
  //   expect(dialogPositioner).toBeVisible()
  // })

  it('should be able to lazy mount', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
      },
    })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  // TODO fix me
  it.skip('should not have aria-controls if lazy mounted', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
      },
    })

    expect(screen.getByRole('button', { name: 'Open Dialog' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
        unmountOnExit: true,
      },
    })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })

  it('should be fully controlled (true)', async () => {
    render(ComponentUnderTest, {
      props: {
        open: true,
      },
    })

    expect(screen.queryByRole('button', { name: 'Close' })).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('button', { name: 'Close' })).toBeVisible()
  })

  it('should be fully controlled (false)', async () => {
    render(ComponentUnderTest, {
      props: {
        open: false,
      },
    })

    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
  })
})
