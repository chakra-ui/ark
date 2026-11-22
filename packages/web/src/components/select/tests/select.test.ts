import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as CustomObject } from '../examples/custom-object.js'
import { mount as ShadowRoot } from '../examples/shadow-root.js'
import { mount as Virtualized } from '../examples/virtualized.js'
import { mount } from '../../../test-utils.js'
import { createListCollection } from '@ark-ui/web/select'

const user = userEvent.setup()

const texts = (elements: Iterable<Element>) => Array.from(elements, (element) => element.textContent?.trim())

const items = () => document.querySelectorAll('ark-select-item')

const item = (value: string) => document.querySelector(`ark-select-item[data-value="${value}"]`)

const valueText = () => document.querySelector('ark-select-value-text')

const findTrigger = (container: ParentNode = document) =>
  waitFor(() => {
    const trigger = container.querySelector<HTMLButtonElement>('ark-select-trigger button')
    expect(trigger).toHaveAttribute('aria-haspopup')
    return trigger!
  })

test('an item chosen with the keyboard is shown and selected in the native select', async () => {
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
  const nativeSelection = document.querySelector<HTMLSelectElement>('ark-select select')!.selectedOptions[0]?.text
  expect(nativeSelection).toBeTruthy()
  expect(valueText()!.textContent).toBe(nativeSelection)
})

test('a select inside a shadow root opens and closes on selection', async () => {
  const shadowRoot = mount(ShadowRoot).firstElementChild!.shadowRoot!
  const shadow = within(shadowRoot as unknown as HTMLElement)
  await user.click(await findTrigger(shadowRoot))
  const listbox = await shadow.findByRole('listbox')
  await waitFor(() => expect(listbox).toBeVisible())

  await user.click(shadow.getAllByRole('option')[0]!)

  await waitFor(() => expect(listbox).not.toBeVisible())
})

test('object items show their label and submit their key', async () => {
  mount(CustomObject)
  await user.click(await findTrigger())
  await waitFor(() => expect(screen.getAllByRole('group')).toHaveLength(2))
  expect(screen.getByRole('option', { name: 'Alan Turing' })).toHaveAttribute('aria-disabled', 'true')

  await user.click(screen.getByRole('option', { name: 'Katherine Johnson' }))

  await waitFor(() => expect(valueText()).toHaveTextContent('Katherine Johnson'))
  expect(screen.getByTestId('selection')).toHaveTextContent('Katherine Johnson works in Research')

  await user.click(screen.getByRole('button', { name: 'Submit' }))

  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('Submitted: katherine'))
})

test('items and groups render from the collection property without a template', async () => {
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

test('a collection property renders through the template and clearing it brings back the JSON items', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-select>
        <script type="application/json">["Fallback"]</script>
        <ark-select-list>
          <template><ark-select-item><ark-select-item-text></ark-select-item-text></ark-select-item></template>
        </ark-select-list>
      </ark-select>`
  })
  const select = document.querySelector('ark-select')!
  await waitFor(() => expect(items()).toHaveLength(1))

  select.collection = createListCollection({ items: ['React', 'Solid'] })

  await waitFor(() => expect(texts(items())).toEqual(['React', 'Solid']))

  select.collection = createListCollection<string>({ items: [] })

  await waitFor(() => expect(items()).toHaveLength(0))

  select.collection = undefined

  await waitFor(() => expect(texts(items())).toEqual(['Fallback']))
})

test('End reaches and selects an item that is not rendered in a virtualized list', async () => {
  mount(Virtualized)
  const listbox = await screen.findByRole('listbox', { hidden: true })
  expect(listbox.localName).toBe('ark-list-virtualizer')
  document.querySelector<HTMLButtonElement>('ark-select-trigger button')!.focus()
  await user.keyboard('{ArrowDown}')
  await waitFor(() => expect(listbox).toHaveFocus())

  await user.keyboard('{End}')

  await waitFor(() => expect(item('item-5000')).toHaveAttribute('data-highlighted', ''))
  expect(item('item-5000')).toHaveAttribute('role', 'option')
  expect(item('item-5000')).toHaveAttribute('aria-posinset', '5000')
  expect(item('item-5000')).toHaveAttribute('aria-setsize', '5000')
  expect(items().length).toBeLessThan(100)

  await user.keyboard('{Enter}')

  await waitFor(() => expect(valueText()).toHaveTextContent('Item 5000'))
})

test('with a hidden input part the value is submitted without a native select', async () => {
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
  const submitted = () => new FormData(document.querySelector('form')!).getAll('fruit')
  await waitFor(() => expect(submitted()).toEqual(['apple', 'pear']))
  expect(document.querySelector('ark-select select')).toBeNull()

  document.querySelector('ark-select')!.value = ['pear']

  await waitFor(() => expect(submitted()).toEqual(['pear']))
})
