import { dialogAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { Dialog } from '../'
import { getExports, getParts } from '../../setup-test'
import ComponentUnderTest from './dialog.test.vue'

describe('Dialog', () => {
  it.each(getParts(dialogAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(dialogAnatomy))('should export %s', async (part) => {
    expect(Dialog[part]).toBeDefined()
  })

  it('should show dialog content when opened', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByText('Open Dialog'))
    expect(await screen.findByText('Dialog Title')).toBeVisible()

    await user.click(screen.getByText('Close'))
    expect(await screen.findByText('Dialog Title')).not.toBeVisible()
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

  it.skip('should be able to lazy mount', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
      },
    })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog', { hidden: true })).not.toBeVisible()
  })

  it.skip('should not have aria-controls if lazy mounted', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
      },
    })

    expect(screen.getByRole('button', { name: 'Open Dialog' })).not.toHaveAttribute('aria-controls')
  })

  it.skip('should lazy mount and unmount on exit', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
        unmountOnExit: true,
      },
    })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
