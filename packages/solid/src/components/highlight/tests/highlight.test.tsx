import { render } from '@solidjs/testing-library'
import { createSignal } from 'solid-js'
import { Highlight } from '../index.tsx'

const text = 'Solid is great and Solid is fast'

describe('Highlight', () => {
  it('should wrap matches in mark elements', () => {
    const { container } = render(() => <Highlight text={text} query="Solid" matchAll />)
    const marks = container.querySelectorAll('mark')
    expect(Array.from(marks, (mark) => mark.textContent)).toEqual(['Solid', 'Solid'])
    expect(container).toHaveTextContent(text)
  })

  it('should forward attributes to every mark', () => {
    const { container } = render(() => (
      <Highlight text={text} query="Solid" matchAll class="custom" title="match" data-testid="mark" />
    ))
    const marks = container.querySelectorAll('mark')
    expect(marks).toHaveLength(2)
    for (const mark of marks) {
      expect(mark).toHaveClass('custom')
      expect(mark).toHaveAttribute('title', 'match')
      expect(mark).toHaveAttribute('data-testid', 'mark')
    }
  })

  it('should respect ignoreCase', () => {
    const { container } = render(() => <Highlight text={text} query="solid" ignoreCase />)
    expect(container.querySelector('mark')).toHaveTextContent('Solid')
  })

  it('should update when the query changes', () => {
    const [query, setQuery] = createSignal('great')
    const { container } = render(() => <Highlight text={text} query={query()} />)
    expect(container.querySelector('mark')).toHaveTextContent('great')
    setQuery('fast')
    expect(container.querySelector('mark')).toHaveTextContent('fast')
  })
})
