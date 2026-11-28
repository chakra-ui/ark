import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Customized } from '../examples/customized.js'
import { mount as DataSlicing } from '../examples/data-slicing.js'
import { mount as Link } from '../examples/link.js'
import { mount as PageSizeControl } from '../examples/page-size-control.js'
import { mount as WithEdges } from '../examples/with-edges.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const pagination = () => document.querySelector('ark-pagination')!

const page = (value: number) => screen.getByRole('button', { name: new RegExp(`(^|, )page ${value}$`) })

const trigger = (part: string) => document.querySelector<HTMLElement>(`ark-pagination-${part}-trigger > *`)!

const current = () => document.querySelector('[aria-current="page"]')

const visible = () =>
  Array.from(
    document.querySelectorAll('ark-pagination-item[data-rendered], ark-pagination-ellipsis[data-rendered]'),
    (el) => (el.localName === 'ark-pagination-ellipsis' ? '…' : el.getAttribute('value')),
  )

const start = (example: (root: HTMLElement) => void, attributes: Record<string, string>) =>
  mount((container) => {
    example(container)
    const el = container.querySelector('ark-pagination')!
    for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value)
  })

test('the first page starts current with the previous trigger disabled', async () => {
  mount(Basic)

  await waitFor(() => expect(page(1)).toHaveAttribute('aria-current', 'page'))
  expect(pagination()).toHaveAttribute('aria-label', 'pagination')
  expect(page(2)).not.toHaveAttribute('aria-current')
  expect(page(1)).toHaveTextContent('1')
  expect(trigger('previous')).toBeDisabled()
  expect(trigger('next')).toBeEnabled()
  expect(screen.getByRole('button', { name: 'last page, page 500' })).toHaveTextContent('500')
  expect(visible()).toEqual(['1', '2', '3', '4', '5', '6', '7', '…', '500'])
})

test('clicking a page makes it current, reports it through pagechange and keeps focus', async () => {
  mount(Basic)
  const changed = vi.fn()
  pagination().addEventListener('pagechange', (event) => changed((event as CustomEvent).detail.page))
  await waitFor(() => expect(page(1)).toHaveAttribute('aria-current', 'page'))

  await user.click(page(5))

  await waitFor(() => expect(page(5)).toHaveAttribute('aria-current', 'page'))
  expect(changed).toHaveBeenLastCalledWith(5)
  expect(page(1)).not.toHaveAttribute('aria-current')
  expect(page(5)).toHaveFocus()
  expect(pagination()).toHaveProperty('page', 5)
  expect(trigger('previous')).toBeEnabled()
})

test('the next and previous triggers step through the pages', async () => {
  mount(Basic)
  await waitFor(() => expect(page(1)).toHaveAttribute('aria-current', 'page'))

  await user.click(trigger('next'))
  await waitFor(() => expect(page(2)).toHaveAttribute('aria-current', 'page'))

  await user.click(trigger('next'))
  await waitFor(() => expect(page(3)).toHaveAttribute('aria-current', 'page'))

  await user.click(trigger('previous'))
  await waitFor(() => expect(page(2)).toHaveAttribute('aria-current', 'page'))
  expect(current()).toBe(page(2))
})

test('a middle page shows an ellipsis on both sides of its siblings', async () => {
  start(Basic, { 'default-page': '250' })

  await waitFor(() => expect(page(250)).toHaveAttribute('aria-current', 'page'))
  expect(visible()).toEqual(['1', '…', '248', '249', '250', '251', '252', '…', '500'])
  expect(document.querySelectorAll('ark-pagination-ellipsis[data-rendered]')).toHaveLength(2)
})

test('the first and last triggers jump to the edges and disable at them', async () => {
  mount(WithEdges)
  await waitFor(() => expect(page(1)).toHaveAttribute('aria-current', 'page'))
  expect(trigger('first')).toBeDisabled()
  expect(trigger('first')).toHaveAttribute('aria-label', 'first page')

  await user.click(trigger('last'))

  await waitFor(() => expect(page(250)).toHaveAttribute('aria-current', 'page'))
  expect(trigger('last')).toBeDisabled()
  expect(trigger('next')).toBeDisabled()
  expect(trigger('first')).toBeEnabled()
  expect(trigger('previous')).toBeEnabled()

  await user.click(trigger('first'))

  await waitFor(() => expect(page(1)).toHaveAttribute('aria-current', 'page'))
  expect(trigger('first')).toBeDisabled()
})

test('a page-size attribute set after mount recomputes the total pages', async () => {
  mount(Basic)
  await waitFor(() => expect(screen.getByRole('button', { name: 'last page, page 500' })).toBeInTheDocument())

  pagination().setAttribute('page-size', '100')

  await waitFor(() => expect(screen.getByRole('button', { name: 'last page, page 50' })).toBeInTheDocument())
  expect(screen.queryByRole('button', { name: /page 500/ })).not.toBeInTheDocument()
})

test('changing the page size through the api reports pagesizechange', async () => {
  mount(PageSizeControl)
  const changed = vi.fn()
  pagination().addEventListener('pagesizechange', (event) => changed((event as CustomEvent).detail.pageSize))
  await waitFor(() => expect(screen.getByText('Page 1 of 10')).toBeInTheDocument())

  await user.selectOptions(screen.getByRole('combobox'), '50')

  await waitFor(() => expect(screen.getByText('Page 1 of 2')).toBeInTheDocument())
  expect(changed).toHaveBeenLastCalledWith(50)
  expect(visible()).toEqual(['1', '2'])
})

test('a controlled pagination reports clicks and follows its page attribute', async () => {
  mount(Controlled)
  const changed = vi.fn()
  pagination().addEventListener('pagechange', (event) => changed((event as CustomEvent).detail.page))
  await waitFor(() => expect(page(1)).toHaveAttribute('aria-current', 'page'))

  await user.click(trigger('next'))

  await waitFor(() => expect(page(2)).toHaveAttribute('aria-current', 'page'))
  expect(changed).toHaveBeenCalledWith(2)

  pagination().setAttribute('page', '7')

  await waitFor(() => expect(page(7)).toHaveAttribute('aria-current', 'page'))
  expect(current()).toBe(page(7))
  expect(trigger('previous')).toBeEnabled()
})

test('the link type renders anchors with page urls and disables the edge trigger', async () => {
  mount(Link)
  const item = (value: number) => screen.getByRole('link', { name: new RegExp(`(^|, )page ${value}$`) })
  await waitFor(() => expect(item(1)).toHaveAttribute('aria-current', 'page'))

  expect(item(2)).toHaveAttribute('href', '/page=2')
  expect(item(2).localName).toBe('a')
  expect(trigger('next')).toHaveAttribute('href', '/page=2')
  expect(trigger('previous')).toHaveAttribute('aria-disabled', 'true')
  expect(trigger('previous')).not.toHaveAttribute('href')
  expect(trigger('previous')).toHaveAttribute('role', 'link')
})

test('translations relabel the triggers and items', async () => {
  mount(Customized)

  await waitFor(() => expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page'))
  expect(trigger('next')).toHaveAccessibleName('Next')
  expect(trigger('previous')).toHaveAccessibleName('Prev')
})

test('the api slices the data for the current page', async () => {
  mount(DataSlicing)
  await waitFor(() => expect(screen.getByText('Emma Wilson')).toBeInTheDocument())
  expect(screen.queryByText('Ethan Garcia')).not.toBeInTheDocument()

  await user.click(page(2))

  await waitFor(() => expect(screen.getByText('Ethan Garcia')).toBeInTheDocument())
  expect(screen.queryByText('Emma Wilson')).not.toBeInTheDocument()
  expect(visible()).toEqual(['1', '2', '3', '4'])
})
