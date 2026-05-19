import { describe, expect, it, vi } from 'vitest'
import {
  type AsyncListProps,
  type AsyncListService,
  type LoadDetails,
  type LoadResult,
  type SortDescriptor,
  connectAsyncList,
  createAsyncListMachine,
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

type AsyncListContext<T, C> = {
  items: T[]
  filterText: string
  cursor?: C | null
  sortDescriptor?: SortDescriptor<T>
  error?: Error
}

const getAsyncListAction = (name: string) => {
  const action = createAsyncListMachine.implementations?.actions?.[name]
  expect(action).toBeDefined()
  return action as unknown as (params: Record<string, unknown>) => void
}

const createAsyncListParams = <T, C>(
  props: AsyncListProps<T, C>,
  context: AsyncListContext<T, C>,
  event: Record<string, unknown> = { type: 'RELOAD' },
) => {
  const refs = {
    abort: null as AbortController | null,
    seq: 0,
  }
  const sent: Array<Record<string, unknown>> = []

  return {
    params: {
      context: {
        get: (key: keyof AsyncListContext<T, C>) => context[key],
        set: <K extends keyof AsyncListContext<T, C>>(
          key: K,
          value: AsyncListContext<T, C>[K] | ((previous: AsyncListContext<T, C>[K]) => AsyncListContext<T, C>[K]),
        ) => {
          const previous = context[key]
          const next =
            typeof value === 'function'
              ? (value as (previous: AsyncListContext<T, C>[K]) => AsyncListContext<T, C>[K])(previous)
              : value
          context[key] = next
        },
      },
      event,
      prop: (key: keyof AsyncListProps<T, C>) => props[key],
      refs: {
        get: (key: keyof typeof refs) => refs[key],
        set: <K extends keyof typeof refs>(key: K, value: (typeof refs)[K]) => {
          refs[key] = value
        },
      },
      send: (nextEvent: Record<string, unknown>) => {
        sent.push(nextEvent)
      },
    },
    refs,
    sent,
  }
}

const connectAsyncListSnapshot = <T, C>(context: AsyncListContext<T, C>, state: 'idle' | 'loading' | 'sorting') =>
  connectAsyncList({
    context: {
      get: (key: keyof AsyncListContext<T, C>) => context[key],
    },
    send: vi.fn(),
    state: {
      matches: (...values: string[]) => values.includes(state),
    },
  } as unknown as AsyncListService<T, C>)

const waitForAsyncListEvent = async (sent: Array<Record<string, unknown>>) => {
  await new Promise((resolve) => setTimeout(resolve, 0))
  expect(sent).toHaveLength(1)
  return sent[0]
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
    expect(createAsyncListMachine).toBeDefined()
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
    expect(collection.findMany(['c', 'a']).map((item) => item.label)).toEqual(['Cherry', 'Apple'])
    expect(collection.stringify('a')).toBe('Apple')
    expect(collection.getValues()).toEqual(['a', 'b', 'c'])
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
    expect(grid.getRows().map((row) => row.map((item) => item.value))).toEqual([
      ['00', '01'],
      ['10', '11'],
    ])
    expect(grid.getCell(1, 0)?.value).toBe('10')
    expect(grid.getValueCell('11')).toEqual({ row: 1, column: 1 })
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
    expect(tree.getValuePath([0, 1])).toEqual(['a', 'a2'])
    expect(tree.getDescendantValues('a')).toEqual(['a1', 'a2'])
    expect(tree.getDepth('a1')).toBe(2)
  })

  it('builds tree collections from file paths', () => {
    const tree = createFileTreeCollection(['src/index.ts', 'src/lib/util.ts', 'README.md'])
    expect(tree).toBeInstanceOf(TreeCollection)
    expect(tree.rootNode.value).toBe('ROOT')
    expect(tree.getValues()).toEqual(['src', 'src/index.ts', 'src/lib', 'src/lib/util.ts', 'README.md'])
    expect(tree.findNode('src/lib/util.ts')?.label).toBe('util.ts')
    expect(tree.getParentNode('src/lib/util.ts')?.value).toBe('src/lib')
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
    expect(selection.selectionMode).toBe('multiple')
    expect(selection.deselectable).toBe(true)

    const next = selection.select(collection, 'a').select(collection, 'b')
    expect(next.isSelected('a')).toBe(true)
    expect(next.isSelected('b')).toBe(true)
    expect(next.size).toBe(2)

    const toggled = next.toggleSelection(collection, 'a')
    expect(toggled.isSelected('a')).toBe(false)
    expect(toggled.isSelected('b')).toBe(true)

    const replaced = toggled.replaceSelection(collection, 'c')
    expect(replaced.isSelected('b')).toBe(false)
    expect(replaced.isSelected('c')).toBe(true)
    expect(replaced.clearSelection().isEmpty()).toBe(true)
  })

  it('extends list selection across a collection range', () => {
    const items: Item[] = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
      { value: 'd', label: 'D' },
    ]
    const collection = createListCollection<Item>({ items })
    const selection = createListSelection({ selectionMode: 'multiple' })

    const extended = selection.extendSelection(collection, 'b', 'd')
    expect(Array.from(extended)).toEqual(['b', 'c', 'd'])
    expect(extended.firstSelectedValue(collection)).toBe('b')
    expect(extended.lastSelectedValue(collection)).toBe('d')

    const narrowed = extended.extendSelection(collection, 'b', 'c')
    expect(Array.from(narrowed)).toEqual(['b', 'c'])
  })

  it('loads async list items through the machine and connected api', async () => {
    const items = [{ value: 1 }, { value: 2 }]
    let details: LoadDetails<{ value: number }, string> | undefined
    const onSuccess = vi.fn()
    const props: AsyncListProps<{ value: number }, string> = {
      load: async (
        loadDetails: LoadDetails<{ value: number }, string>,
      ): Promise<LoadResult<{ value: number }, string>> => {
        details = loadDetails
        return {
          items,
          cursor: 'next-page',
        }
      },
      onSuccess,
    }
    const context: AsyncListContext<{ value: number }, string> = {
      items: [],
      filterText: 'ap',
      cursor: null,
    }
    const { params, sent } = createAsyncListParams(props, context)

    getAsyncListAction('performFetch')(params)
    const success = await waitForAsyncListEvent(sent)

    expect(success).toMatchObject({ type: 'SUCCESS', items, cursor: 'next-page', append: false })
    expect(details?.filterText).toBe('ap')
    expect(details?.cursor).toBeNull()
    expect(details?.signal).toBeInstanceOf(AbortSignal)

    getAsyncListAction('setItems')({ ...params, event: success })
    getAsyncListAction('setCursor')({ ...params, event: success })
    getAsyncListAction('clearError')(params)
    getAsyncListAction('invokeOnSuccess')({ ...params, event: success })

    const api = connectAsyncListSnapshot(context, 'idle')

    expect(api.items).toEqual(items)
    expect(api.cursor).toBe('next-page')
    expect(api.hasMore).toBe(true)
    expect(api.empty).toBe(false)
    expect(api.error).toBeUndefined()
    expect(onSuccess).toHaveBeenCalledWith({ items })
  })

  it('exposes async list load failures through the connected api', async () => {
    const error = new Error('boom')
    const onError = vi.fn()
    const props: AsyncListProps<{ value: number }, string> = {
      load: async () => {
        throw error
      },
      onError,
    }
    const context: AsyncListContext<{ value: number }, string> = {
      items: [{ value: 1 }],
      filterText: '',
      cursor: null,
    }
    const { params, sent } = createAsyncListParams(props, context)

    getAsyncListAction('performFetch')(params)
    const failure = await waitForAsyncListEvent(sent)

    expect(failure).toEqual({ type: 'ERROR', error })

    getAsyncListAction('setError')({ ...params, event: failure })
    getAsyncListAction('invokeOnError')({ ...params, event: failure })

    const api = connectAsyncListSnapshot(context, 'idle')

    expect(api.items).toEqual([{ value: 1 }])
    expect(api.error).toBe(error)
    expect(api.loading).toBe(false)
    expect(onError).toHaveBeenCalledWith({ error })
  })
})
