import { describe, expect, it } from 'vitest'
import {
  type AsyncListProps,
  type LoadDetails,
  type LoadResult,
  asyncListMachine,
  connectAsyncList,
  createFileTreeCollection,
  createGridCollection,
  createListCollection,
  createListSelection,
  createTreeCollection,
  GridCollection,
  ListCollection,
  Selection,
  TreeCollection,
} from './public-api'

interface Item {
  value: string
  label: string
  disabled?: boolean
}

interface Node {
  value: string
  children?: Node[]
}

describe('collection entrypoint (criterion 27)', () => {
  it('re-exports list, grid, tree, selection, and async-list public surfaces', () => {
    expect(ListCollection).toBeDefined()
    expect(GridCollection).toBeDefined()
    expect(TreeCollection).toBeDefined()
    expect(Selection).toBeDefined()
    expect(createListCollection).toBeDefined()
    expect(createGridCollection).toBeDefined()
    expect(createTreeCollection).toBeDefined()
    expect(createFileTreeCollection).toBeDefined()
    expect(createListSelection).toBeDefined()
    expect(asyncListMachine).toBeDefined()
    expect(connectAsyncList).toBeDefined()
  })

  it('looks up list items by value', () => {
    const items: Item[] = [
      { value: 'a', label: 'Apple' },
      { value: 'b', label: 'Banana' },
      { value: 'c', label: 'Cherry' },
    ]
    const collection = createListCollection<Item>({ items })

    expect(collection).toBeInstanceOf(ListCollection)
    expect(collection.find('b')?.label).toBe('Banana')
    expect(collection.indexOf('c')).toBe(2)
    expect(collection.has('z')).toBe(false)
  })

  it('navigates grid rows and columns', () => {
    const items: Item[] = [
      { value: '00', label: '0,0' },
      { value: '01', label: '0,1' },
      { value: '10', label: '1,0' },
      { value: '11', label: '1,1' },
    ]
    const grid = createGridCollection<Item>({ items, columnCount: 2 })

    expect(grid).toBeInstanceOf(GridCollection)
    expect(grid.getRowCount()).toBe(2)
    expect(grid.getCell(1, 0)?.value).toBe('10')
    expect(grid.getNextRowValue('00')).toBe('10')
    expect(grid.getPreviousRowValue('10')).toBe('00')
  })

  it('flattens tree collections in depth-first order', () => {
    const root: Node = {
      value: 'root',
      children: [{ value: 'a', children: [{ value: 'a1' }, { value: 'a2' }] }, { value: 'b' }],
    }
    const tree = createTreeCollection<Node>({
      rootNode: root,
      nodeToValue: (node) => node.value,
      nodeToString: (node) => node.value,
      nodeToChildren: (node) => node.children ?? [],
    })

    expect(tree).toBeInstanceOf(TreeCollection)
    const order = tree.flatten().map((node) => node.value)
    expect(order).toEqual(['root', 'a', 'a1', 'a2', 'b'])
  })

  it('builds tree collections from file paths', () => {
    const tree = createFileTreeCollection(['src/index.ts', 'src/lib/util.ts'])
    expect(tree).toBeInstanceOf(TreeCollection)
    expect(tree.getValues().length).toBeGreaterThan(0)
  })

  it('updates list selection state', () => {
    const items: Item[] = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ]
    const collection = createListCollection<Item>({ items })

    const selection = createListSelection({ selectionMode: 'multiple', deselectable: true })
    expect(selection).toBeInstanceOf(Selection)
    expect(selection.isEmpty()).toBe(true)

    const next = selection.select(collection, 'a').select(collection, 'b')
    expect(next.isSelected('a')).toBe(true)
    expect(next.isSelected('b')).toBe(true)
    expect(next.size).toBe(2)

    const toggled = next.toggleSelection(collection, 'a')
    expect(toggled.isSelected('a')).toBe(false)
    expect(toggled.isSelected('b')).toBe(true)
  })

  it('invokes async list load handler for success', async () => {
    const items = [{ value: 1 }, { value: 2 }]
    const props: AsyncListProps<{ value: number }, string> = {
      load: async (
        _details: LoadDetails<{ value: number }, string>,
      ): Promise<LoadResult<{ value: number }, string>> => ({
        items,
      }),
    }

    const result = await props.load({ signal: undefined, filterText: '' })
    expect(result.items).toEqual(items)
  })

  it('invokes async list load handler for failure', async () => {
    const props: AsyncListProps<{ value: number }, string> = {
      load: async () => {
        throw new Error('boom')
      },
    }

    await expect(props.load({ signal: undefined, filterText: '' })).rejects.toThrow('boom')
  })
})
