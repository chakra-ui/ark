import { render } from '@testing-library/vue'
import { Highlight } from '../index.ts'

const text = 'Vue is great and Vue is fast'

describe('Highlight', () => {
  it('should wrap matches in mark elements', () => {
    const { container } = render(Highlight, { props: { text, query: 'Vue', matchAll: true } })
    const marks = container.querySelectorAll('mark')
    expect(Array.from(marks, (mark) => mark.textContent)).toEqual(['Vue', 'Vue'])
    expect(container).toHaveTextContent(text)
  })

  it('should forward attributes to every mark', () => {
    const { container } = render(Highlight, {
      props: { text, query: 'Vue', matchAll: true },
      attrs: { class: 'custom', title: 'match', 'data-testid': 'mark' },
    })
    const marks = container.querySelectorAll('mark')
    expect(marks).toHaveLength(2)
    for (const mark of marks) {
      expect(mark).toHaveClass('custom')
      expect(mark).toHaveAttribute('title', 'match')
      expect(mark).toHaveAttribute('data-testid', 'mark')
    }
  })

  it('should respect ignoreCase', () => {
    const { container } = render(Highlight, { props: { text, query: 'vue', ignoreCase: true } })
    expect(container.querySelector('mark')).toHaveTextContent('Vue')
  })

  it('should update when the query changes', async () => {
    const { container, rerender } = render(Highlight, { props: { text, query: 'great' } })
    expect(container.querySelector('mark')).toHaveTextContent('great')
    await rerender({ text, query: 'fast' })
    expect(container.querySelector('mark')).toHaveTextContent('fast')
  })
})
