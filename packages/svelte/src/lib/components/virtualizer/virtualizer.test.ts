import { render, screen } from '@testing-library/svelte'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import GridExample from './examples/grid.svelte'
import ListExample from './examples/list.svelte'
import WindowExample from './examples/window.svelte'

const rect = { width: 400, height: 240, top: 0, left: 0, right: 400, bottom: 240, x: 0, y: 0, toJSON: () => ({}) }

describe('Virtualizer', () => {
  beforeEach(() => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(rect as DOMRect)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders a window of list items', async () => {
    render(ListExample)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(await screen.findByText('Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Item 10000')).not.toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeLessThan(100)
  })

  it('sizes the list content to the total size', async () => {
    render(ListExample)
    await screen.findByText('Item 1')
    const content = screen.getByRole('list').firstElementChild as HTMLElement
    expect(content.style.height).toBe(`${10000 * 48}px`)
  })

  it('renders a window of grid rows and cells', async () => {
    render(GridExample)
    expect(screen.getByRole('grid')).toHaveAttribute('aria-rowcount', '1000')
    expect(await screen.findByText('R1C1')).toBeInTheDocument()
    expect(screen.queryByText('R1000C50')).not.toBeInTheDocument()
    expect(screen.getAllByRole('row').length).toBeLessThan(100)
  })

  it('renders a window of window-scrolled items', async () => {
    render(WindowExample)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(await screen.findByText('Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Item 10000')).not.toBeInTheDocument()
  })
})
