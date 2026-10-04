import { render, waitFor } from '@testing-library/vue'
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
})
