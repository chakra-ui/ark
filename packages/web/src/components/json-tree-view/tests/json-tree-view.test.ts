import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as ExpandLevel } from '../examples/expand-level.js'
import { mount as FromMarkup } from '../examples/from-markup.js'
import { mount as RenderValue } from '../examples/render-value.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

afterEach(() => {
  document.body.innerHTML = ''
})

const row = (name: RegExp) => screen.findByRole('row', { name })

test('json tree view renders the data and expands to the given depth', async () => {
  mount(Basic)
  expect(await screen.findByRole('treegrid')).toBeInTheDocument()
  const root = await row(/^Object, expandable/)
  await waitFor(() => expect(root).toHaveAttribute('aria-expanded', 'true'))
  expect(await row(/^name: "John Doe"/)).toBeVisible()
  expect(await row(/^address: /)).toHaveAttribute('aria-expanded', 'false')
})

test('json tree view types its values for styling', async () => {
  mount(Basic)
  await row(/^age: 30/)
  expect(document.querySelector('[data-type="number"]')).toHaveTextContent('30')
  expect(document.querySelector('[data-kind="key"]')).toHaveTextContent('name')
})

test('json tree view expands a branch and reports it', async () => {
  mount(Basic)
  const view = document.querySelector('ark-json-tree-view')!
  const changes: string[][] = []
  view.addEventListener('expandedchange', (event) => changes.push((event as CustomEvent).detail.expandedValue))
  const address = await row(/^address: /)
  await user.click(address)
  await waitFor(() => expect(address).toHaveAttribute('aria-expanded', 'true'))
  expect(await row(/^city: "Anytown"/)).toBeVisible()
  expect(changes.at(-1)).toHaveLength(2)
})

test('json tree view expands deeper with default-expanded-depth', async () => {
  mount(ExpandLevel)
  const address = await row(/^address: /)
  await waitFor(() => expect(address).toHaveAttribute('aria-expanded', 'true'))
})

test('json tree view reads its data from a JSON script and draws indent guides', async () => {
  mount(FromMarkup)
  expect(await row(/^status: "active"/)).toBeVisible()
  expect(document.querySelector('[data-tree-view-indent-guide]')).toBeInTheDocument()
})

test('json tree view renders custom values', async () => {
  mount(RenderValue)
  const link = await screen.findByRole('link', { name: /john\.doe@example\.com/ })
  expect(link).toHaveAttribute('href', 'mailto:john.doe@example.com')
})

test('json tree view keeps expanded branches when the data changes', async () => {
  mount(ExpandLevel)
  const view = document.querySelector('ark-json-tree-view')!
  expect(await row(/^address: /)).toHaveAttribute('aria-expanded', 'true')
  view.data = { name: 'Jane', address: { city: 'Elsewhere' } }
  expect(await row(/^city: "Elsewhere"/)).toBeVisible()
  expect(await row(/^address: /)).toHaveAttribute('aria-expanded', 'true')
})

test('json tree view keeps expanded branches when it is moved', async () => {
  mount(Basic)
  const view = document.querySelector('ark-json-tree-view')!
  const address = await row(/^address: /)
  await user.click(address)
  await waitFor(() => expect(address).toHaveAttribute('aria-expanded', 'true'))
  const host = document.createElement('div')
  document.body.append(host)
  host.append(view)
  await waitFor(() => expect(screen.getByRole('row', { name: /^address: / })).toHaveAttribute('aria-expanded', 'true'))
})

test('json tree view re-renders when renderValue is set later', async () => {
  mount(Basic)
  await row(/^age: 30/)
  document.querySelector('ark-json-tree-view-tree')!.renderValue = (node) =>
    node.type === 'text' && node.value === '30' ? 'thirty' : undefined
  await waitFor(() => expect(screen.getByRole('row', { name: /^age: 30/ })).toHaveTextContent('age: thirty'))
})

test('json tree view follows edits to its JSON script', async () => {
  mount(FromMarkup)
  await row(/^status: "active"/)
  document.querySelector('ark-json-tree-view script')!.textContent = '{"status": "archived"}'
  expect(await row(/^status: "archived"/)).toBeInTheDocument()
})

test('json tree view uses a tree part added after it rendered', async () => {
  document.body.innerHTML = '<ark-json-tree-view default-expanded-depth="1"></ark-json-tree-view>'
  const view = document.querySelector('ark-json-tree-view')!
  view.data = { a: 1 }
  await row(/^a: 1/)
  const part = document.createElement('ark-json-tree-view-tree')
  part.setAttribute('indent-guide', '')
  view.append(part)
  await waitFor(() => expect(document.querySelectorAll('ark-json-tree-view-tree')).toHaveLength(1))
  await waitFor(() => expect(document.querySelector('[data-tree-view-indent-guide]')).toBeInTheDocument())
})
