import { ListVirtualizer, useListVirtualizer } from '@ark-ui/solid/virtualizer'
import { render, screen } from '@solidjs/testing-library'
import { For, createSignal } from 'solid-js'
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

  it('keeps rendered items in range when the count shrinks', async () => {
    const [items, setItems] = createSignal(Array.from({ length: 200 }, (_, index) => `Item ${index + 1}`))
    const errors: unknown[] = []
    const Shrinking = () => {
      const virtualizer = useListVirtualizer(() => ({ count: items().length, estimatedSize: () => 48 }))
      return (
        <ListVirtualizer.Root value={virtualizer}>
          <ListVirtualizer.Content>
            <For each={virtualizer.getVirtualItems()} keyed={false}>
              {(item) => {
                const label = () => items()[item().index]
                if (label() === undefined) errors.push(item().index)
                return <ListVirtualizer.Item item={item()}>{label()}</ListVirtualizer.Item>
              }}
            </For>
          </ListVirtualizer.Content>
        </ListVirtualizer.Root>
      )
    }
    render(() => <Shrinking />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    setItems(['Only'])
    expect(await screen.findByText('Only')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(errors).toEqual([])
  })
})
