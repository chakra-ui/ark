import { render, screen } from '@solidjs/testing-library'
import { describe, it, expect } from 'vitest'
import { ComponentUnderTest } from './basic'

describe('Toc', () => {
  it('should render correct semantic landmarks', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByText(/on this page/i)).toBeInTheDocument()
  })

  it('should render the correct number of items', () => {
    render(() => <ComponentUnderTest />)
    const items = screen.getAllByRole('listitem')
    expect(items.length).toBe(5)
  })

  it('should have correct hrefs for links', () => {
    render(() => <ComponentUnderTest />)
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '#introduction')
    expect(links[1]).toHaveAttribute('href', '#getting-started')
    expect(links[2]).toHaveAttribute('href', '#installation')
    expect(links[3]).toHaveAttribute('href', '#usage')
    expect(links[4]).toHaveAttribute('href', '#conclusion')
  })

  it('should have correct text content for links', () => {
    render(() => <ComponentUnderTest />)
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveTextContent('Introduction')
    expect(links[1]).toHaveTextContent('Getting Started')
    expect(links[2]).toHaveTextContent('Installation')
    expect(links[3]).toHaveTextContent('Usage')
    expect(links[4]).toHaveTextContent('Conclusion')
  })

  it('should have correct heading structure', () => {
    render(() => <ComponentUnderTest />)
    const headings = screen.getAllByRole('heading')
    expect(headings[0]).toHaveTextContent('Introduction')
    expect(headings[1]).toHaveTextContent('Getting Started')
    expect(headings[2]).toHaveTextContent('Installation')
    expect(headings[3]).toHaveTextContent('Usage')
    expect(headings[4]).toHaveTextContent('Conclusion')
  })
})
