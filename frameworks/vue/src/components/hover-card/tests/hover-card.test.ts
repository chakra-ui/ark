import { hoverCardAnatomy } from '@ark-ui/anatomy'
import user from '@testing-library/user-event'
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/vue'
import { HoverCard } from '../'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from './hover-card.test.vue'

describe('Hover Card', () => {
  it.each(getParts(hoverCardAnatomy))('should render part! %s', async (part) => {
    render(ComponentUnderTest)

    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(hoverCardAnatomy))('should export %s', async (part) => {
    expect(HoverCard[part]).toBeDefined()
  })

  it('should open on hover', async () => {
    render(ComponentUnderTest)

    const target = screen.getByText('Hover me')
    await user.hover(target)

    const hoverContent = screen.getByText('Content')
    await waitFor(() => expect(hoverContent).toBeVisible())

    await user.unhover(target)
    await waitFor(() => expect(hoverContent).not.toBeVisible())
  })

  it('should invoke onOpenChange', async () => {
    const onOpenChange = vi.fn()
    render(ComponentUnderTest, { props: { onOpenChange } })

    await user.hover(screen.getByText('Hover me'))

    await waitFor(() => expect(screen.getByText('Content')).toBeVisible())
    expect(onOpenChange).toHaveBeenCalledTimes(1)
  })

  it('should lazy mount', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true } })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Hover me'))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
  })

  it('should lazy mount and unmount on exit', async () => {
    render(ComponentUnderTest, { props: { lazyMount: true, unmountOnExit: true } })

    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Hover me'))
    expect(screen.getByTestId('positioner')).toBeInTheDocument()

    await user.unhover(screen.getByText('Hover me'))
    await waitForElementToBeRemoved(screen.queryByTestId('positioner'))
  })
})
