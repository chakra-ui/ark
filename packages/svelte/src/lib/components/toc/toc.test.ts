import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import BasicComponent from './tests/basic.svelte'

describe('Toc', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(BasicComponent)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should render Nav as a nav landmark', () => {
    render(BasicComponent)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('should render Content as an article', () => {
    const { container } = render(BasicComponent)
    expect(container.querySelector('article')).toBeInTheDocument()
  })

  it('should render the title', () => {
    render(BasicComponent)
    expect(screen.getByText('On this page')).toBeInTheDocument()
  })

  it('should render all links with correct hrefs', () => {
    render(BasicComponent)
    expect(screen.getByRole('link', { name: 'introduction' })).toHaveAttribute('href', '#introduction')
    expect(screen.getByRole('link', { name: 'usage' })).toHaveAttribute('href', '#usage')
    expect(screen.getByRole('link', { name: 'api reference' })).toHaveAttribute('href', '#api-reference')
  })

  it('should render the indicator', () => {
    render(BasicComponent)
    expect(screen.getByTestId('indicator')).toHaveAttribute('data-part', 'indicator')
  })

  it('should apply data-part attributes to all parts', () => {
    const { container } = render(BasicComponent)
    expect(container.querySelector('[data-part="title"]')).toBeInTheDocument()
    expect(container.querySelector('[data-part="list"]')).toBeInTheDocument()
    expect(container.querySelector('[data-part="item"]')).toBeInTheDocument()
    expect(container.querySelector('[data-part="link"]')).toBeInTheDocument()
    expect(container.querySelector('[data-part="indicator"]')).toBeInTheDocument()
  })

  it('should set data-active on the link matching defaultActiveIds', () => {
    const { container } = render(BasicComponent, { props: { defaultActiveIds: ['usage'] } })
    expect(container.querySelector('[data-part="link"][data-value="usage"]')).toHaveAttribute('data-active', '')
    expect(container.querySelector('[data-part="link"][data-value="introduction"]')).not.toHaveAttribute('data-active')
  })

  it('should support multiple defaultActiveIds', () => {
    const { container } = render(BasicComponent, { props: { defaultActiveIds: ['introduction', 'usage'] } })
    expect(container.querySelector('[data-part="link"][data-value="introduction"]')).toHaveAttribute('data-active', '')
    expect(container.querySelector('[data-part="link"][data-value="usage"]')).toHaveAttribute('data-active', '')
    expect(container.querySelector('[data-part="link"][data-value="installation"]')).not.toHaveAttribute('data-active')
  })

  it('should reflect controlled activeIds', () => {
    const { container } = render(BasicComponent, { props: { activeIds: ['installation'] } })
    expect(container.querySelector('[data-part="link"][data-value="installation"]')).toHaveAttribute('data-active', '')
    expect(container.querySelector('[data-part="link"][data-value="introduction"]')).not.toHaveAttribute('data-active')
  })

  it('should update active link when controlled activeIds change', async () => {
    const { container, rerender } = render(BasicComponent, { props: { activeIds: ['introduction'] } })
    expect(container.querySelector('[data-part="link"][data-value="introduction"]')).toHaveAttribute('data-active', '')

    await rerender({ activeIds: ['usage'] })
    expect(container.querySelector('[data-part="link"][data-value="usage"]')).toHaveAttribute('data-active', '')
    expect(container.querySelector('[data-part="link"][data-value="introduction"]')).not.toHaveAttribute('data-active')
  })
})
