import { render, screen, waitFor } from '@testing-library/vue'
import ComponentUnderTest from './toc.test.vue'

const items = [
  { value: 'intro', depth: 2 },
  { value: 'usage', depth: 2 },
]

describe('Toc', () => {
  it('should auto scroll to the active item by default', async () => {
    const { rerender } = render(ComponentUnderTest, { props: { items, activeIds: ['intro'] } })

    const nav = screen.getByTestId('nav')
    Object.defineProperties(nav, { scrollHeight: { value: 200 }, clientHeight: { value: 100 } })
    nav.getBoundingClientRect = () => new DOMRect(0, 0, 100, 100)
    screen.getByTestId('item-usage').getBoundingClientRect = () => new DOMRect(0, 150, 100, 20)
    const scrollTo = vi.fn()
    nav.scrollTo = scrollTo

    await rerender({ items, activeIds: ['usage'] })

    await waitFor(() => expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 70 })))
  })

  it('should not render the root and nav with the same id', () => {
    render(ComponentUnderTest, { props: { items } })

    const root = screen.getByTestId('root')
    const nav = screen.getByTestId('nav')

    expect(nav).toHaveAttribute('id')
    expect(root.id).not.toBe(nav.id)
    expect(nav).toHaveAttribute('aria-labelledby', screen.getByText('On this page').id)
    expect(nav).toHaveAttribute('data-part', 'nav')
    expect(root).not.toHaveAttribute('aria-labelledby')
  })
})
