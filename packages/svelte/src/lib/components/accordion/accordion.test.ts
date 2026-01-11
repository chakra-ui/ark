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
    expect(screen.getByText('What is Ark UI?')).toBeInTheDocument()
    expect(screen.getByText('How to get started?')).toBeInTheDocument()
  })

  it('should show default expanded item', () => {
    render(ComponentUnderTest)

    // Ark UI is open by default
    const arkContent = screen.getByText('A headless component library for building accessible web apps.')
    expect(arkContent).toBeVisible()

    // Getting started should be closed
    const gettingStartedContent = screen.getByText('Install the package and import the components you need.')
    expect(gettingStartedContent).not.toBeVisible()
  })
})
