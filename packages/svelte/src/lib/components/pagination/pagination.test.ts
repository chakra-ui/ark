import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import BasicComponentUnderTest from './examples/basic.svelte'
import LinkComponentUnderTest from './tests/pagination-link.test.svelte'

describe('Pagination', () => {
  it('should render items and triggers as buttons by default', async () => {
    render(BasicComponentUnderTest)

    expect(screen.getByLabelText('page 2')).toHaveProperty('tagName', 'BUTTON')
    expect(screen.getByLabelText('next page')).toHaveProperty('tagName', 'BUTTON')
  })

  it('should render items and triggers as links when type is link', async () => {
    render(LinkComponentUnderTest)

    const pageThree = screen.getByLabelText('page 3')
    expect(pageThree).toHaveProperty('tagName', 'A')
    expect(pageThree).toHaveAttribute('href', '/page/3')

    for (const [label, href] of [
      ['first page', '/page/1'],
      ['previous page', '/page/1'],
      ['next page', '/page/3'],
      ['last page', '/page/10'],
    ]) {
      const trigger = screen.getByLabelText(label)
      expect(trigger).toHaveProperty('tagName', 'A')
      expect(trigger).toHaveAttribute('href', href)
    }
  })

  it('should accept anchor attributes on a link-typed trigger', async () => {
    render(LinkComponentUnderTest)

    const nextTrigger = screen.getByLabelText('next page')
    expect(nextTrigger).toHaveAttribute('target', '_blank')
    expect(nextTrigger).toHaveAttribute('rel', 'noreferrer')
  })
})
