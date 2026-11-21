import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as List } from '../../../../examples/virtualizer/list.js'
import { mount as ScrollToIndex } from '../../../../examples/virtualizer/scroll-to-index.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const mountList = (example: (root: HTMLElement) => void) =>
  mount(example).querySelector<HTMLElement>('[data-testid=list]')!

const item = (list: HTMLElement, index: number) => list.querySelector(`[data-index="${index}"]`)

const renderedIndexes = (list: HTMLElement) =>
  Array.from(list.querySelectorAll('[data-index]')).map((el) => Number(el.getAttribute('data-index')))

test('list renders only a window of items', async () => {
  const list = mountList(List)

  await waitFor(() => expect(item(list, 0)).toHaveTextContent('Item 1'))
  expect(list).toHaveAttribute('role', 'list')
  expect(item(list, 0)).toHaveAttribute('aria-setsize', '10000')

  const indexes = renderedIndexes(list)
  expect(indexes.length).toBeGreaterThan(5)
  expect(indexes.length).toBeLessThan(50)
  expect(item(list, 9999)).toBeNull()
})

test('scrolling changes the rendered window', async () => {
  const list = mountList(List)

  await waitFor(() => expect(item(list, 0)).toBeInTheDocument())

  list.scrollTop = 48 * 5000
  list.dispatchEvent(new Event('scroll'))

  await waitFor(() => expect(item(list, 5000)).toBeInTheDocument())
  expect(item(list, 0)).toBeNull()
  expect(item(list, 5000)).toHaveAttribute('aria-posinset', '5001')
})

test('scrollToIndex brings a far item into the DOM', async () => {
  const list = mountList(ScrollToIndex)

  await waitFor(() => expect(item(list, 0)).toBeInTheDocument())
  expect(item(list, 9999)).toBeNull()

  await user.click(screen.getByRole('button', { name: 'Scroll to bottom' }))
  await waitFor(() => expect(item(list, 9999)).toHaveTextContent('Item 10000'))

  await user.click(screen.getByRole('button', { name: 'Scroll to top' }))
  await waitFor(() => expect(item(list, 0)).toBeInTheDocument())
})
