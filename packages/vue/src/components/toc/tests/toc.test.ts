import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './toc.test.vue'

const items = [
  { value: 'intro', depth: 2 },
  { value: 'usage', depth: 2 },
]

describe('Toc', () => {
  it('should auto scroll to the active item by default', async () => {
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView

    const { rerender } = render(ComponentUnderTest, { props: { items, activeIds: ['intro'] } })
    scrollIntoView.mockClear()

    await rerender({ items, activeIds: ['usage'] })

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
  })

  it('should not render the root and nav with the same id', () => {
    render(ComponentUnderTest, { props: { items } })

    const root = screen.getByTestId('root')
    const nav = screen.getByTestId('nav')

    expect(nav).toHaveAttribute('id')
    expect(root.id).not.toBe(nav.id)
    expect(nav).toHaveAttribute('aria-labelledby', screen.getByText('On this page').id)
  })
})
