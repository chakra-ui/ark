import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { axe } from 'vitest-axe'
import { Toc } from '../'
import { ComponentUnderTest, items } from './basic'

class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('Toc', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should render Nav as a nav landmark', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render Content as an article', () => {
    const { container } = render(<ComponentUnderTest />)
    expect(container.querySelector('article')).toBeInTheDocument()
  })

  it('should render the title', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByText('On this page')).toBeInTheDocument()
  })

  it('should render all links with correct hrefs', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('link', { name: 'introduction' })).toHaveAttribute('href', '#introduction')
    expect(screen.getByRole('link', { name: 'usage' })).toHaveAttribute('href', '#usage')
    expect(screen.getByRole('link', { name: 'api reference' })).toHaveAttribute('href', '#api-reference')
  })

  it('should render the indicator', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByTestId('indicator')).toHaveAttribute('data-part', 'indicator')
  })

  it('should apply data-part attributes to all parts', () => {
    const { container } = render(<ComponentUnderTest />)
    expect(container.querySelector('[data-part="title"]')).toBeInTheDocument()
    expect(container.querySelector('[data-part="list"]')).toBeInTheDocument()
    expect(container.querySelector('[data-part="item"]')).toBeInTheDocument()
    expect(container.querySelector('[data-part="link"]')).toBeInTheDocument()
    expect(container.querySelector('[data-part="indicator"]')).toBeInTheDocument()
  })

  it('should set data-active on the link matching defaultActiveIds', () => {
    const { container } = render(<ComponentUnderTest defaultActiveIds={['usage']} />)
    expect(container.querySelector('[data-part="link"][data-value="usage"]')).toHaveAttribute('data-active', '')
    expect(container.querySelector('[data-part="link"][data-value="introduction"]')).not.toHaveAttribute('data-active')
  })

  it('should support multiple defaultActiveIds', () => {
    const { container } = render(<ComponentUnderTest defaultActiveIds={['introduction', 'usage']} />)
    expect(container.querySelector('[data-part="link"][data-value="introduction"]')).toHaveAttribute('data-active', '')
    expect(container.querySelector('[data-part="link"][data-value="usage"]')).toHaveAttribute('data-active', '')
    expect(container.querySelector('[data-part="link"][data-value="installation"]')).not.toHaveAttribute('data-active')
  })

  it('should reflect controlled activeIds', () => {
    const { container } = render(<ComponentUnderTest activeIds={['installation']} onActiveChange={vi.fn()} />)
    expect(container.querySelector('[data-part="link"][data-value="installation"]')).toHaveAttribute('data-active', '')
    expect(container.querySelector('[data-part="link"][data-value="introduction"]')).not.toHaveAttribute('data-active')
  })

  it('should update active link when controlled activeIds change', () => {
    const { container, rerender } = render(<ComponentUnderTest activeIds={['introduction']} onActiveChange={vi.fn()} />)
    expect(container.querySelector('[data-part="link"][data-value="introduction"]')).toHaveAttribute('data-active', '')

    rerender(<ComponentUnderTest activeIds={['usage']} onActiveChange={vi.fn()} />)
    expect(container.querySelector('[data-part="link"][data-value="usage"]')).toHaveAttribute('data-active', '')
    expect(container.querySelector('[data-part="link"][data-value="introduction"]')).not.toHaveAttribute('data-active')
  })

  it('should expose activeIds via Context render prop', () => {
    render(
      <Toc.Root items={[items[0]]} defaultActiveIds={['introduction']}>
        <Toc.Nav>
          <Toc.Context>{(ctx) => <output data-testid="active-count">{ctx.activeIds.length}</output>}</Toc.Context>
          <Toc.List>
            <Toc.Item item={items[0]}>
              <Toc.Link href="#introduction">introduction</Toc.Link>
            </Toc.Item>
          </Toc.List>
        </Toc.Nav>
      </Toc.Root>,
    )
    expect(screen.getByTestId('active-count')).toHaveTextContent('1')
  })
})
