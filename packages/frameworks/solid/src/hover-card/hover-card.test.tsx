import { render, screen, waitFor } from '@solidjs/testing-library'
import user from '@testing-library/user-event'
import { Portal } from 'solid-js/web'
import { vi } from 'vitest'
import { HoverCard, type HoverCardProps } from '..'

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
  it('should open on hover', async () => {
    render(() => <ComponentUnderTest />)

    const target = screen.getByText('Hover me')
    await user.hover(target)

    const hoverContent = screen.getByText('Content')
    await waitFor(() => expect(hoverContent).toBeVisible())

    await user.unhover(target)
    await waitFor(() => expect(hoverContent).not.toBeVisible())
  })

  it('should invoke onOpen', async () => {
    const onOpen = vi.fn()
    render(() => <ComponentUnderTest onOpenChange={onOpen} />)
    await user.hover(screen.getByText('Hover me'))

    await waitFor(() => expect(screen.getByText('Content')).toBeVisible())
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('should lazy mount', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Hover me'))
    expect(screen.queryByTestId('positioner')).toBeInTheDocument()
  })

  it('should lazy mount and unmount on exit', async () => {
    render(() => <ComponentUnderTest lazyMount unmountOnExit />)
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Hover me'))
    expect(screen.queryByTestId('positioner')).toBeInTheDocument()

    await user.unhover(screen.getByText('Hover me'))
    await waitFor(() => expect(screen.queryByTestId('positioner')).not.toBeInTheDocument())
  })
})
