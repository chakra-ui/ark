import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as LoadMore } from '../../../../examples/listbox/load-more.js'
import { mount as Virtualized } from '../../../../examples/listbox/virtualized.js'
import { intersect, mount, observedTargets } from '../../../test-utils.js'
import { createListCollection, type ListboxElement } from '@ark-ui/web/listbox'

const texts = (elements: Iterable<Element>) => Array.from(elements, (element) => element.textContent?.trim())

test('listbox loads the next page when the sentinel scrolls into view', async () => {
  mount(LoadMore)
  const options = () => screen.queryAllByRole('option')

  await waitFor(() => expect(options()).toHaveLength(20))
  await waitFor(() => expect(observedTargets()).toHaveLength(1))

  intersect(observedTargets()[0])
  await waitFor(() => expect(options()).toHaveLength(40))
  expect(options().at(-1)).toHaveTextContent('Pokémon #40')
  await waitFor(() => expect(options().at(-1)).toHaveAttribute('aria-setsize', '40'))
})

test('listbox replaces its items when a new collection is assigned', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-listbox>
        <ark-listbox-content><ark-listbox-list></ark-listbox-list></ark-listbox-content>
      </ark-listbox>`
  })
  const listbox = document.querySelector('ark-listbox')!

  listbox.collection = createListCollection({ items: ['One', 'Two'] })
  await waitFor(() => expect(texts(screen.getAllByRole('option'))).toEqual(['One', 'Two']))

  listbox.collection = createListCollection({
    items: [{ value: 'three', label: 'Three', disabled: true }],
  })
  await waitFor(() => expect(texts(screen.getAllByRole('option'))).toEqual(['Three']))
  expect(screen.getByRole('option')).toHaveAttribute('aria-disabled', 'true')
})

test('collection properties win over markup, which returns once they are cleared', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-listbox>
        <ark-listbox-list>
          <ark-listbox-item value="markup"><ark-listbox-item-text>Markup</ark-listbox-item-text></ark-listbox-item>
        </ark-listbox-list>
      </ark-listbox>`
  })
  const listbox = document.querySelector<ListboxElement>('ark-listbox')!
  const rendered = () => document.querySelectorAll('ark-listbox-item[data-rendered]')

  listbox.collection = createListCollection({ items: ['data'] })
  await waitFor(() => expect(texts(rendered())).toEqual(['data']))
  await waitFor(() => expect(listbox.api?.collection.getValues()).toEqual(['data']))

  listbox.collection = undefined
  await waitFor(() => expect(rendered()).toHaveLength(0))
  await waitFor(() => expect(listbox.api?.collection.getValues()).toEqual(['markup']))
})

test('listbox keyboard navigation reaches off-screen items in a virtualized list', async () => {
  const user = userEvent.setup()
  mount(Virtualized)

  const item = (value: string) => document.querySelector(`ark-listbox-item[data-value="${value}"]`)
  const listbox = await screen.findByRole('listbox')
  expect(listbox.localName).toBe('ark-list-virtualizer')

  await waitFor(() => expect(item('item-1')).toBeInTheDocument())
  await user.click(item('item-1')!)

  await user.keyboard('{End}')
  await waitFor(() => expect(item('item-5000')).toHaveAttribute('data-highlighted', ''))
  expect(item('item-5000')).toHaveAttribute('role', 'option')
  expect(item('item-5000')).toHaveAttribute('aria-posinset', '5000')
  expect(item('item-5000')).toHaveAttribute('aria-setsize', '5000')
  expect(item('item-1')).toBeNull()
  expect(document.querySelectorAll('ark-listbox-item').length).toBeLessThan(100)

  await user.keyboard('{Home}')
  await waitFor(() => expect(item('item-1')).toHaveAttribute('data-highlighted', ''))
}, 15_000)
