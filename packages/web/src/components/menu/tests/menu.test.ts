import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { createListCollection } from '@ark-ui/web/menu'

import { mount as AsyncFiltering } from '../examples/async-filtering.js'
import { mount as Collection } from '../examples/collection.js'
import { mount as Filtering } from '../examples/filtering.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const texts = (elements: Iterable<Element>) => Array.from(elements, (element) => element.textContent?.trim())

test('async filtering loads matching people and assigns the chosen one', async () => {
  mount(AsyncFiltering)
  const trigger = await waitFor(() => {
    const trigger = screen.getByRole('button', { name: 'Assign' })
    expect(trigger).toHaveAttribute('aria-haspopup')
    return trigger
  })
  await user.click(trigger)
  const input = await screen.findByRole('searchbox', { name: 'Search people' })

  await user.type(input, 'ken')

  expect(await screen.findByText('Searching...')).toBeInTheDocument()
  await waitFor(() => expect(screen.queryByText('Searching...')).not.toBeInTheDocument())
  await waitFor(() => expect(texts(screen.getAllByRole('menuitemradio'))).toEqual(['Ken Thompson']))

  await user.click(screen.getByRole('menuitemradio', { name: 'Ken Thompson' }))

  await waitFor(() => expect(trigger).toHaveTextContent('Ken Thompson'))
})

test('the menu input does not hide items on its own', async () => {
  document.body.innerHTML = /* html */ `
    <ark-menu popup-type="dialog">
      <ark-menu-trigger><button>Actions</button></ark-menu-trigger>
      <ark-menu-positioner>
        <ark-menu-content>
          <ark-menu-input><input aria-label="Search actions" /></ark-menu-input>
          <ark-menu-list>
            <ark-menu-item value="rename">Rename</ark-menu-item>
            <ark-menu-item value="delete">Delete</ark-menu-item>
          </ark-menu-list>
        </ark-menu-content>
      </ark-menu-positioner>
    </ark-menu>`
  const menu = document.querySelector('ark-menu')!
  await menu.ready
  menu.open = true

  await user.type(await screen.findByRole('searchbox', { name: 'Search actions' }), 'zzz')

  expect(texts(screen.getAllByRole('menuitem'))).toEqual(['Rename', 'Delete'])
})

test('filtering with createFilter narrows the items and shows the empty state', async () => {
  mount(Filtering)
  await user.click(await screen.findByRole('button', { name: 'Actions' }))
  const input = await screen.findByRole('searchbox', { name: 'Filter actions' })

  await user.type(input, 'FILE')

  await waitFor(() => expect(texts(screen.getAllByRole('menuitem'))).toEqual(['New file', 'Open file']))
  expect(screen.getByText('No actions found')).not.toBeVisible()

  await user.clear(input)
  await user.type(input, 'zzz')

  await waitFor(() => expect(screen.getByText('No actions found')).toBeVisible())
  expect(screen.queryAllByRole('menuitem')).toEqual([])
})

const collectionMenu = /* html */ `
  <ark-menu>
    <ark-menu-trigger><button>Options</button></ark-menu-trigger>
    <ark-menu-positioner>
      <ark-menu-content>
        <ark-menu-list></ark-menu-list>
      </ark-menu-content>
    </ark-menu-positioner>
  </ark-menu>`

const options = [
  { value: 'save', label: 'Save', group: 'File' },
  { value: 'grid', label: 'Show grid', group: 'View', type: 'checkbox', checked: true },
  { value: 'name', label: 'Name', group: 'Sort', type: 'radio' },
  { value: 'date', label: 'Date', group: 'Sort', type: 'radio', checked: true },
]

async function openCollectionMenu() {
  document.body.innerHTML = collectionMenu
  const menu = document.querySelector('ark-menu')!
  menu.collection = createListCollection({ items: options, groupBy: (item) => item.group })
  await menu.ready
  menu.open = true
  await screen.findByRole('menuitem', { name: 'Save' })
  return menu
}

test('a collection renders plain, checkbox and radio items from their type', async () => {
  await openCollectionMenu()

  expect(screen.getByRole('menuitemcheckbox', { name: 'Show grid' })).toBeChecked()
  expect(screen.getByRole('menuitemradio', { name: 'Date' })).toBeChecked()
  expect(screen.getByRole('menuitemradio', { name: 'Name' })).not.toBeChecked()
  expect(document.querySelector('ark-menu-radio-item-group')).toHaveAttribute('value', 'date')
})

test('assigning a new collection reuses the nodes of items that stay', async () => {
  const menu = await openCollectionMenu()
  const grid = screen.getByRole('menuitemcheckbox', { name: 'Show grid' })

  menu.collection = createListCollection({
    items: options.filter((item) => item.value !== 'save'),
    groupBy: (item) => item.group,
  })

  await waitFor(() => expect(screen.queryByRole('menuitem', { name: 'Save' })).not.toBeInTheDocument())
  expect(screen.getByRole('menuitemcheckbox', { name: 'Show grid' })).toBe(grid)
})

test('checked options keep their state while the list is filtered', async () => {
  mount(Filtering)
  await user.click(await screen.findByRole('button', { name: 'Actions' }))
  const input = await screen.findByRole('searchbox', { name: 'Filter actions' })

  await user.click(await screen.findByRole('menuitemcheckbox', { name: 'Show sidebar' }))
  await user.type(input, 'show')

  await waitFor(() => expect(screen.getByRole('menuitemcheckbox', { name: 'Show sidebar' })).toBeChecked())
  expect(screen.getByRole('menuitemcheckbox', { name: 'Show details' })).toBeChecked()
})

const highlighted = () => document.querySelector('[data-highlighted]')?.textContent?.trim()

test('a collection navigates its items in the order they render', async () => {
  mount(Collection)
  await user.click(await screen.findByRole('button', { name: 'File' }))
  await screen.findByRole('menuitem', { name: 'New file' })
  const rendered = texts(document.querySelectorAll('[role^="menuitem"]'))

  const visited: (string | undefined)[] = []
  for (const _ of rendered) {
    await user.keyboard('{ArrowDown}')
    visited.push(highlighted())
  }

  expect(visited).toEqual(rendered)
})

test('a collection updates checkbox and radio state from its data', async () => {
  mount(Collection)
  await user.click(await screen.findByRole('button', { name: 'File' }))
  await screen.findByRole('menuitem', { name: 'New file' })

  expect(screen.getByRole('menuitemcheckbox', { name: 'Show toolbar' })).toBeChecked()
  expect(screen.getByRole('menuitemradio', { name: 'Date modified' })).toBeChecked()

  await user.click(screen.getByRole('menuitemcheckbox', { name: 'Show status bar' }))
  await waitFor(() => expect(screen.getByRole('menuitemcheckbox', { name: 'Show status bar' })).toBeChecked())

  await user.click(screen.getByRole('menuitemradio', { name: 'Name' }))
  await user.click(screen.getByRole('button', { name: 'File' }))
  await waitFor(() => expect(screen.getByRole('menuitemradio', { name: 'Name' })).toBeChecked())
  expect(screen.getByRole('menuitemradio', { name: 'Date modified' })).not.toBeChecked()
})
