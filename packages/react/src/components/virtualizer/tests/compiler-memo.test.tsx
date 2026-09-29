import { render, screen } from '@testing-library/react'
import { useMemo } from 'react'
import { ListVirtualizer, useListVirtualizer } from '../index.ts'

const rect = { width: 400, height: 240, top: 0, left: 0, right: 400, bottom: 240, x: 0, y: 0, toJSON: () => ({}) }

const MemoizedList = () => {
  const virtualizer = useListVirtualizer({ count: 1000, estimatedSize: () => 48 })
  const items = useMemo(
    () =>
      virtualizer.getVirtualItems().map((item) => (
        <ListVirtualizer.Item key={item.key} item={item}>
          Item {item.index + 1}
        </ListVirtualizer.Item>
      )),
    [virtualizer],
  )
  return (
    <ListVirtualizer.Root value={virtualizer}>
      <ListVirtualizer.Content>{items}</ListVirtualizer.Content>
    </ListVirtualizer.Root>
  )
}

describe('Virtualizer / memoized consumers', () => {
  beforeEach(() => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(rect as DOMRect)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('re-renders output memoized on the virtualizer when the store updates', () => {
    render(<MemoizedList />)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })
})
