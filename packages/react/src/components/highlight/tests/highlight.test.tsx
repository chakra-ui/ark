import { render } from '@testing-library/react'
import { Highlight } from '../index.ts'

const text = 'React is great and React is fast'

describe('Highlight', () => {
  it('should wrap matches in mark elements', () => {
    const { container } = render(<Highlight text={text} query="React" matchAll />)
    const marks = container.querySelectorAll('mark')
    expect(Array.from(marks, (mark) => mark.textContent)).toEqual(['React', 'React'])
    expect(container).toHaveTextContent(text)
  })

  it('should forward attributes to every mark', () => {
    const { container } = render(
      <Highlight text={text} query="React" matchAll className="custom" title="match" data-testid="mark" />,
    )
    const marks = container.querySelectorAll('mark')
    expect(marks).toHaveLength(2)
    for (const mark of marks) {
      expect(mark).toHaveClass('custom')
      expect(mark).toHaveAttribute('title', 'match')
      expect(mark).toHaveAttribute('data-testid', 'mark')
    }
  })

  it('should respect ignoreCase', () => {
    const { container } = render(<Highlight text={text} query="react" ignoreCase />)
    expect(container.querySelector('mark')).toHaveTextContent('React')
  })

  it('should update when the query changes', () => {
    const { container, rerender } = render(<Highlight text={text} query="great" />)
    expect(container.querySelector('mark')).toHaveTextContent('great')
    rerender(<Highlight text={text} query="fast" />)
    expect(container.querySelector('mark')).toHaveTextContent('fast')
  })
})
