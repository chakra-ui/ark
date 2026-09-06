import { render, screen } from '@solidjs/testing-library'
import { Grid } from '../examples/grid.tsx'
import { List } from '../examples/list.tsx'
import { Window } from '../examples/window.tsx'

const rect = { width: 400, height: 240, top: 0, left: 0, right: 400, bottom: 240, x: 0, y: 0, toJSON: () => ({}) }

describe('Virtualizer', () => {
  beforeEach(() => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(rect as DOMRect)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders a window of list items', () => {
    render(() => <List />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Item 10000')).not.toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeLessThan(100)
  })

  it('sizes the list content to the total size', () => {
    render(() => <List />)
    const content = screen.getByRole('list').firstElementChild as HTMLElement
    expect(content.style.height).toBe(`${10000 * 48}px`)
  })

  it('renders a window of grid rows and cells', () => {
    render(() => <Grid />)
    expect(screen.getByRole('grid')).toHaveAttribute('aria-rowcount', '1000')
    expect(screen.getByText('R1C1')).toBeInTheDocument()
    expect(screen.queryByText('R1000C50')).not.toBeInTheDocument()
    expect(screen.getAllByRole('row').length).toBeLessThan(100)
  })

  it('renders a window of window-scrolled items', () => {
    render(() => <Window />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Item 10000')).not.toBeInTheDocument()
  })
})
