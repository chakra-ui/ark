import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/select/basic.js'
import { mount as CustomObject } from '../../../../examples/select/custom-object.js'
import { mount as ShadowRoot } from '../../../../examples/select/shadow-root.js'
import { mount as Virtualized } from '../../../../examples/select/virtualized.js'
import { mount } from '../../../test-utils.js'
import { createListCollection, type SelectElement } from '@ark-ui/web/select'

const user = userEvent.setup()

const texts = (elements: Iterable<Element>) => Array.from(elements, (element) => element.textContent?.trim())

const findTrigger = (container: ParentNode = document) =>
  waitFor(() => {
    const trigger = container.querySelector<HTMLButtonElement>('ark-select-trigger button')
    expect(trigger).toHaveAttribute('aria-haspopup')
    return trigger!
  })

test('select supports keyboard selection and native form integration', async () => {
  mount(Basic)
  const trigger = await findTrigger()

  trigger.focus()
  await user.keyboard('{ArrowDown}')
  const listbox = await screen.findByRole('listbox')
  await waitFor(() => expect(listbox).toBeVisible())
  await waitFor(() => expect(listbox).toHaveFocus())

  await user.keyboard('{ArrowUp}')
  await waitFor(() => expect(screen.getByRole('option', { name: 'Solid' })).toHaveAttribute('data-highlighted', ''))

  await user.keyboard('{Enter}')
  await waitFor(() => expect(listbox).not.toBeVisible())
  const root = document.querySelector('ark-select')!
  const text = root.querySelector('ark-select-value-text')!.textContent
  expect(text).toBeTruthy()
  expect(text).toBe(root.querySelector('select')!.selectedOptions[0]?.text)
})

test('select works inside a shadow root', async () => {
  const container = mount(ShadowRoot)
  const shadow = within(container.firstElementChild!.shadowRoot! as unknown as HTMLElement)

  await user.click(await findTrigger(container.firstElementChild!.shadowRoot!))
  const listbox = await shadow.findByRole('listbox')
  await waitFor(() => expect(listbox).toBeVisible())

  await user.click(shadow.getAllByRole('option')[0]!)
  await waitFor(() => expect(listbox).not.toBeVisible())
})

test('select object items render through the collection and submit their key', async () => {
  mount(CustomObject)

  await user.click(await findTrigger())
  await waitFor(() => expect(screen.getAllByRole('group')).toHaveLength(2))
  expect(screen.getByRole('option', { name: 'Alan Turing' })).toHaveAttribute('aria-disabled', 'true')

  await user.click(screen.getByRole('option', { name: 'Katherine Johnson' }))
  await waitFor(() => expect(document.querySelector('ark-select-value-text')).toHaveTextContent('Katherine Johnson'))
  expect(screen.getByTestId('selection')).toHaveTextContent('Katherine Johnson works in Research')

  await user.click(screen.getByRole('button', { name: 'Submit' }))
  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('Submitted: katherine'))
})

test('select renders bare items and groups without a template', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <form>
        <ark-select name="fruit">
          <ark-select-trigger><button type="button">Open</button></ark-select-trigger>
          <ark-select-positioner>
            <ark-select-content><ark-select-list></ark-select-list></ark-select-content>
          </ark-select-positioner>
        </ark-select>
      </form>`
  })
  const select = document.querySelector('ark-select')!
  select.collection = createListCollection({
    items: [
      { id: 'a', name: 'Apple', kind: 'Fruit' },
      { id: 'c', name: 'Carrot', kind: 'Vegetable' },
    ],
    itemToValue: (item) => item.id,
    itemToString: (item) => item.name,
    groupBy: (item) => item.kind,
  })
  const items = () => document.querySelectorAll('ark-select-item')

  await waitFor(() => expect(texts(items())).toEqual(['Apple', 'Carrot']))
  expect(document.querySelectorAll('ark-select-item-group')).toHaveLength(2)
  expect(texts(document.querySelectorAll('ark-select-item-group-label'))).toEqual(['Fruit', 'Vegetable'])
  expect(items()[0]).toHaveAttribute('value', 'a')
  await waitFor(() => expect(items()[1]).toHaveAttribute('aria-posinset', '2'))
  expect(items()[1]).toHaveAttribute('aria-setsize', '2')

  await user.click(await findTrigger())
  await user.click(await screen.findByRole('option', { name: 'Carrot' }))
  await waitFor(() => expect(new FormData(document.querySelector('form')!).get('fruit')).toBe('c'))

  select.collection = createListCollection({ items: ['Kiwi', 'Lime', 'Mango'] })
  await waitFor(() => expect(texts(items())).toEqual(['Kiwi', 'Lime', 'Mango']))
  expect(document.querySelectorAll('ark-select-item-group')).toHaveLength(0)
  await waitFor(() =>
    expect(texts(document.querySelectorAll('ark-select select option'))).toEqual(['Kiwi', 'Lime', 'Mango']),
  )
})

test('collection properties refresh templates and restore the JSON fallback', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-select>
        <script type="application/json">["Fallback"]</script>
        <ark-select-list>
          <template><ark-select-item><ark-select-item-text></ark-select-item-text></ark-select-item></template>
        </ark-select-list>
      </ark-select>`
  })
  const select = document.querySelector<SelectElement>('ark-select')!
  const items = () => document.querySelectorAll('ark-select-item')

  await waitFor(() => expect(items()).toHaveLength(1))

  select.collection = createListCollection({ items: ['React', 'Solid'] })
  await waitFor(() => expect(texts(items())).toEqual(['React', 'Solid']))

  select.collection = createListCollection<string>({ items: [] })
  await waitFor(() => expect(items()).toHaveLength(0))

  select.collection = undefined
  await waitFor(() => expect(texts(items())).toEqual(['Fallback']))
})

test('select keyboard navigation reaches off-screen items in a virtualized list', async () => {
  const user = userEvent.setup()
  mount(Virtualized)

  const listbox = await screen.findByRole('listbox', { hidden: true })
  expect(listbox.localName).toBe('ark-list-virtualizer')

  const trigger = document.querySelector<HTMLButtonElement>('ark-select-trigger button')!
  trigger.focus()
  await user.keyboard('{ArrowDown}')
  await waitFor(() => expect(listbox).toHaveFocus())

  await user.keyboard('{End}')
  const last = () => document.querySelector('ark-select-item[data-value="item-5000"]')
  await waitFor(() => expect(last()).toHaveAttribute('data-highlighted', ''))
  expect(last()).toHaveAttribute('role', 'option')
  expect(last()).toHaveAttribute('aria-posinset', '5000')
  expect(last()).toHaveAttribute('aria-setsize', '5000')
  expect(document.querySelectorAll('ark-select-item').length).toBeLessThan(100)

  await user.keyboard('{Enter}')
  await waitFor(() => expect(document.querySelector('ark-select-value-text')).toHaveTextContent('Item 5000'))
})

test('hidden input part submits the value instead of a hidden select', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <form>
        <ark-select name="fruit" multiple default-value="apple,pear">
          <ark-select-list>
            <ark-select-item value="apple"><ark-select-item-text>Apple</ark-select-item-text></ark-select-item>
            <ark-select-item value="pear"><ark-select-item-text>Pear</ark-select-item-text></ark-select-item>
          </ark-select-list>
          <ark-select-hidden-input></ark-select-hidden-input>
        </ark-select>
      </form>`
  })
  const form = () => new FormData(document.querySelector('form')!)

  await waitFor(() => expect(form().getAll('fruit')).toEqual(['apple', 'pear']))
  expect(document.querySelector('ark-select select')).toBeNull()

  document.querySelector('ark-select')!.value = ['pear']
  await waitFor(() => expect(form().getAll('fruit')).toEqual(['pear']))
})
