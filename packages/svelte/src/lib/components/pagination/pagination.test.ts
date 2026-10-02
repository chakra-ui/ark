import { render, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import BasicComponentUnderTest from './examples/basic.svelte'
import LinkComponentUnderTest from './examples/link.svelte'

describe('Pagination', () => {
  it('should render items and triggers as buttons by default', async () => {
    render(BasicComponentUnderTest)

    expect(screen.getByLabelText('page 2')).toHaveProperty('tagName', 'BUTTON')
    expect(screen.getByLabelText('next page')).toHaveProperty('tagName', 'BUTTON')
  })

  it('should render items and triggers as links when type is link', async () => {
    render(LinkComponentUnderTest)

    const pageTwo = screen.getByLabelText('page 2')
    expect(pageTwo).toHaveProperty('tagName', 'A')
    expect(pageTwo).toHaveAttribute('href', '/page=2')

    const nextTrigger = screen.getByLabelText('next page')
    expect(nextTrigger).toHaveProperty('tagName', 'A')
    expect(nextTrigger).toHaveAttribute('href', '/page=2')
  })
})
