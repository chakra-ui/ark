import { hoverCardAnatomy } from '@ark-ui/anatomy'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { Portal } from '../portal'
import { getExports, getParts } from '../setup-test'
import { HoverCard, type HoverCardProps } from './'

const ComponentUnderTest = (props: HoverCardProps) => (
  <HoverCard.Root openDelay={0} closeDelay={0} {...props}>
    <HoverCard.Trigger>Hover me</HoverCard.Trigger>
    <Portal>
      <HoverCard.Positioner data-testid="positioner">
        <HoverCard.Content>
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
          Content
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Portal>
  </HoverCard.Root>
)

describe('HoverCard', () => {
  it.each(getParts(hoverCardAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(hoverCardAnatomy))('should export %s', async (part) => {
    expect(HoverCard[part]).toBeDefined()
  })

  it('should open on hover', async () => {
    render(<ComponentUnderTest />)

    const target = screen.getByText('Hover me')
    await user.hover(target)

    const hoverContent = screen.getByText('Content')
    await waitFor(() => expect(hoverContent).toBeVisible())

    await user.unhover(target)
    await waitFor(() => expect(hoverContent).not.toBeVisible())
  })

  it('should invoke onOpenChange', async () => {
    const onOpenChange = vi.fn()
    render(<ComponentUnderTest onOpenChange={onOpenChange} />)
    await user.hover(screen.getByText('Hover me'))

    await waitFor(() => expect(screen.getByText('Content')).toBeVisible())
    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it('should lazy mount', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Hover me'))
    expect(screen.queryByTestId('positioner')).toBeInTheDocument()
  })

  it('should lazy mount and unmount on exit', async () => {
    render(<ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Hover me'))
    expect(screen.queryByTestId('positioner')).toBeInTheDocument()

    await user.unhover(screen.getByText('Hover me'))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })
})
