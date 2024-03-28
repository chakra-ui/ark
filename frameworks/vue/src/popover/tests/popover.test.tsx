import { popoverAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { Popover } from '../'
import { getExports, getParts } from '../../setup-test'
import ControlledComponentUnderTest from './controlled-popover.test.vue'
import ComponentUnderTest from './popover.test.vue'

describe('Popover', () => {
  it.each(getParts(popoverAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(popoverAnatomy))('should export %s', async (part) => {
    expect(Popover[part]).toBeDefined()
  })

  it('should open and close the popover', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByText('close'))
    expect(screen.queryByText('title')).not.toBeVisible()
  })

  it('should hide the popover when escape is pressed', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(screen.queryByText('title')).not.toBeVisible()
  })

  it('should focus the first focusable element', async () => {
    render(ComponentUnderTest)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it.skip('should allow controlled usage', async () => {
    render(ControlledComponentUnderTest)

    expect(screen.queryByText('title')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.queryByText('title')).toBeVisible()

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.queryByText('title')).not.toBeVisible()
  })

  it('should be able to lazy mount', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
      },
    })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'click me' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'close' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
      },
    })

    expect(screen.getByRole('button', { name: 'click me' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(ComponentUnderTest, {
      props: {
        lazyMount: true,
        unmountOnExit: true,
      },
    })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'click me' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'close' }))
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
  })
})
