import { popoverAnatomy } from '@ark-ui/anatomy'
import { cleanup, render, screen, waitFor } from '@testing-library/react/pure'
import user from '@testing-library/user-event'
import { Popover } from '../'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'
import { ControlledComponentUnderTest } from './controlled'

describe('Popover / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(popoverAnatomy))('should render part! %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(popoverAnatomy))('should export %s', async (part) => {
    expect(Popover[part]).toBeDefined()
  })
})

describe('Popover', () => {
  afterEach(() => {
    cleanup()
  })

  it('should open and close the popover', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByText('close'))
    await waitFor(() => {
      expect(screen.queryByText('title')).not.toBeVisible()
    })
  })

  it('should focus the first focusable element', async () => {
    render(<ComponentUnderTest />)

    await user.click(screen.getByText('click me'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should allow controlled usage', async () => {
    render(<ControlledComponentUnderTest />)
    expect(screen.queryByText('title')).not.toBeVisible()

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.queryByText('title')).toBeVisible()

    await user.click(screen.getByRole('button', { name: /toggle/i }))
    await waitFor(() => {
      expect(screen.queryByText('title')).not.toBeVisible()
    })
  })

  it('should be able to lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'click me' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'close' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should not have aria-controls if lazy mounted', async () => {
    render(<ComponentUnderTest lazyMount />)
    expect(screen.getByRole('button', { name: 'click me' })).not.toHaveAttribute('aria-controls')
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'click me' }))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'close' }))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })
})
