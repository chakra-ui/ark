import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from './toc.test.vue'

const items = [
  { value: 'intro', depth: 2 },
  { value: 'usage', depth: 2 },
]

describe('Toc', () => {
  it('should not render the root and nav with the same id', () => {
    render(ComponentUnderTest, { props: { items } })

    const root = screen.getByTestId('root')
    const nav = screen.getByTestId('nav')

    expect(nav).toHaveAttribute('id')
    expect(root.id).not.toBe(nav.id)
    expect(nav).toHaveAttribute('aria-labelledby', screen.getByText('On this page').id)
    expect(nav).toHaveAttribute('data-toc-nav')
    expect(root).not.toHaveAttribute('aria-labelledby')
  })
})
