import { render, screen } from '@testing-library/svelte'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './examples/basic.svelte'

describe('Accordion', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(ComponentUnderTest)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should render accordion items', async () => {
    render(ComponentUnderTest)
    expect(screen.getByText('What is React?')).toBeInTheDocument()
    expect(screen.getByText('What is Svelte?')).toBeInTheDocument()
  })

  it('should show default expanded item', () => {
    render(ComponentUnderTest)

    // React is open by default
    const reactContent = screen.getByText('React is a JavaScript library for building user interfaces.')
    expect(reactContent).toBeVisible()

    // Vue should be closed
    const vueContent = screen.getByText('Vue is a JavaScript library for building user interfaces.')
    expect(vueContent).not.toBeVisible()
  })
})
