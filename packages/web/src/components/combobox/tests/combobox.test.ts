import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as AsyncSearch } from '../examples/async-search.js'
import { mount as Grouping } from '../examples/grouping.js'
import { mount as Virtualized } from '../examples/virtualized.js'
import { mount } from '../../../test-utils.js'
import { createListCollection } from '@ark-ui/web/combobox'

const user = userEvent.setup()

const texts = (elements: Iterable<Element>) => Array.from(elements, (element) => element.textContent?.trim())

const items = () => document.querySelectorAll('ark-combobox-item')

const item = (value: string) => document.querySelector(`ark-combobox-item[data-value="${value}"]`)

const findInput = () =>
  waitFor(() => {
    const input = screen.getByRole('combobox')
    expect(input).toBeInstanceOf(HTMLInputElement)
    return input as HTMLInputElement
  })

const fill = async (input: HTMLElement, text: string) => {
  await user.clear(input)
  await user.type(input, text)
}

test('a group disappears when filtering leaves it empty', async () => {
  mount(Grouping)
  const input = await findInput()
  await user.click(input)
  await user.keyboard('{ArrowDown}')
  await waitFor(() => expect(screen.getAllByRole('group')).toHaveLength(2))

  await fill(input, 'carrot')

  await waitFor(() => expect(screen.queryByRole('group', { name: 'Fruits' })).not.toBeInTheDocument())
  expect(screen.getByRole('group', { name: 'Vegetables' })).toBeVisible()
})

test('the list is marked busy while results are loading', async () => {
  mount(AsyncSearch)
  const combobox = document.querySelector('ark-combobox')!
  const list = document.querySelector('ark-combobox-list')!
  const input = await findInput()
  expect(list).not.toHaveAttribute('aria-busy')

  await fill(input, 'nolan')

  await waitFor(() => expect(combobox).toHaveAttribute('loading'))
  await waitFor(() => expect(list).toHaveAttribute('aria-busy', 'true'))
  await waitFor(() =>
    expect(texts(screen.getAllByRole('option'))).toEqual(['Inception', 'The Dark Knight', 'Interstellar']),
  )
  await waitFor(() => expect(combobox).not.toHaveAttribute('loading'))
  expect(list).not.toHaveAttribute('aria-busy')
})

test('items render from the collection property and update when it is replaced', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-combobox>
        <ark-combobox-input><input /></ark-combobox-input>
        <ark-combobox-positioner>
          <ark-combobox-content><ark-combobox-list></ark-combobox-list></ark-combobox-content>
        </ark-combobox-positioner>
      </ark-combobox>`
  })
  const combobox = document.querySelector('ark-combobox')!

  combobox.collection = createListCollection({ items: ['Apple', 'Banana'] })

  await waitFor(() => expect(texts(items())).toEqual(['Apple', 'Banana']))
  expect(items()[0]).toHaveAttribute('value', 'Apple')

  combobox.collection = createListCollection({ items: ['Cherry'] })

  await waitFor(() => expect(texts(items())).toEqual(['Cherry']))
})

test('arrow keys and filtering reach items that are not rendered in a virtualized list', async () => {
  mount(Virtualized)
  const input = await findInput()

  input.focus()
  await user.keyboard('{ArrowUp}')

  await waitFor(() => expect(item('item-5000')).toHaveAttribute('data-highlighted', ''))
  expect(item('item-5000')).toHaveAttribute('role', 'option')
  expect(item('item-5000')).toHaveAttribute('aria-posinset', '5000')
  expect(item('item-5000')).toHaveAttribute('aria-setsize', '5000')
  expect(items().length).toBeLessThan(100)

  await fill(input, 'Item 42')

  await waitFor(() => expect(items()[0]).toHaveTextContent('Item 42'))
  expect(items()[0]).toHaveAttribute('aria-setsize', '111')
}, 15_000)
