import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as LoadMore } from '../examples/load-more.js'
import { mount as Virtualized } from '../examples/virtualized.js'
import { intersect, mount, observedTargets } from '../../../test-utils.js'
import { createListCollection } from '@ark-ui/web/listbox'

const texts = (elements: Iterable<Element>) => Array.from(elements, (element) => element.textContent?.trim())

const options = () => screen.queryAllByRole('option')

const item = (value: string) => document.querySelector(`ark-listbox-item[data-value="${value}"]`)

test('the next page loads when the end of the list scrolls into view', async () => {
  mount(LoadMore)
  await waitFor(() => expect(options()).toHaveLength(20))
  await waitFor(() => expect(observedTargets()).toHaveLength(1))

  intersect(observedTargets()[0])

  await waitFor(() => expect(options()).toHaveLength(40))
  expect(options().at(-1)).toHaveTextContent('Pokémon #40')
  await waitFor(() => expect(options().at(-1)).toHaveAttribute('aria-setsize', '40'))
})

test('assigning a new collection replaces the items', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-listbox>
        <ark-listbox-content><ark-listbox-list></ark-listbox-list></ark-listbox-content>
      </ark-listbox>`
  })
  const listbox = document.querySelector('ark-listbox')!

  listbox.collection = createListCollection({ items: ['One', 'Two'] })

  await waitFor(() => expect(texts(options())).toEqual(['One', 'Two']))

  listbox.collection = createListCollection({ items: [{ value: 'three', label: 'Three', disabled: true }] })

  await waitFor(() => expect(texts(options())).toEqual(['Three']))
  expect(screen.getByRole('option')).toHaveAttribute('aria-disabled', 'true')
})

test('a collection property replaces the markup items until it is cleared', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-listbox>
        <ark-listbox-list>
          <ark-listbox-item value="markup"><ark-listbox-item-text>Markup</ark-listbox-item-text></ark-listbox-item>
        </ark-listbox-list>
      </ark-listbox>`
  })
  const listbox = document.querySelector('ark-listbox')!
  const rendered = () => document.querySelectorAll('ark-listbox-item[data-rendered]')

  listbox.collection = createListCollection({ items: ['data'] })

  await waitFor(() => expect(texts(rendered())).toEqual(['data']))
  await waitFor(() => expect(listbox.api?.collection.getValues()).toEqual(['data']))

  listbox.collection = undefined

  await waitFor(() => expect(rendered()).toHaveLength(0))
  await waitFor(() => expect(listbox.api?.collection.getValues()).toEqual(['markup']))
})

test('Home and End reach items that are not rendered in a virtualized list', async () => {
  const user = userEvent.setup()
  mount(Virtualized)
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
