import { fireEvent, render, screen, waitFor } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import ComponentUnderTest from './menu.test.svelte'

describe('Menu part attributes', () => {
  it('renders the trigger with the data-menu-trigger attribute and no legacy scope/part attributes', () => {
    render(ComponentUnderTest)
    const trigger = screen.getByText('Open')
    expect(trigger).toHaveAttribute('data-menu-trigger')
    expect(trigger).not.toHaveAttribute('data-scope')
    expect(trigger).not.toHaveAttribute('data-part')
  })

  it('renders the separator with the data-menu-separator attribute and no legacy scope/part attributes', async () => {
    render(ComponentUnderTest)
    fireEvent.click(screen.getByText('Open'))
    const separator = await waitFor(() => {
      const el = document.querySelector('[data-menu-separator]')
      expect(el).not.toBeNull()
      return el as HTMLElement
    })
    expect(separator).not.toHaveAttribute('data-scope')
    expect(separator).not.toHaveAttribute('data-part')
  })
})
