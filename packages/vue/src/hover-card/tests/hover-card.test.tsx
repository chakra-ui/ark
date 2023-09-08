import user from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './hover-card.test.vue'

describe('Hover Card', () => {
  it('should render', async () => {
    render(ComponentUnderTest)
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

  it('should invoke onOpen', async () => {
    const onOpen = vi.fn()
    render(ComponentUnderTest, { props: { onOpen } })
    await user.hover(screen.getByText('Hover me'))

    await waitFor(() => expect(screen.getByText('Content')).toBeVisible())
    expect(onOpen).toHaveBeenCalledTimes(1)
  })
})
