import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import '@ark-ui/web/checkbox'
import '@ark-ui/web/dialog'
import '@ark-ui/web/select'
import '@ark-ui/web/tabs'
import '@ark-ui/web/toggle'

const user = userEvent.setup()

const dialogMarkup = /* html */ `
  <ark-dialog>
    <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
    <ark-dialog-positioner>
      <ark-dialog-content><ark-dialog-title>Title</ark-dialog-title><button>Inside</button></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

test('setting a live property changes the state without a change event', async () => {
  document.body.innerHTML = dialogMarkup
  const dialog = document.querySelector('ark-dialog')!
  await dialog.ready
  const events: string[] = []
  dialog.addEventListener('openchange', (event) => events.push(String(event.detail.open)))
  expect(dialog.open).toBe(false)

  dialog.open = true

  expect(dialog.open).toBe(true)
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
  expect(dialog.open).toBe(true)

  dialog.open = false

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  expect(events).toEqual([])

  await user.click(screen.getByRole('button', { name: 'Open' }))

  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
  expect(events).toEqual(['true'])
})

test('live properties read and write the value of each component', async () => {
  document.body.innerHTML = /* html */ `
    <ark-toggle><button>Bold</button></ark-toggle>
    <ark-checkbox><label><ark-checkbox-control></ark-checkbox-control><ark-checkbox-label>Accept</ark-checkbox-label><ark-checkbox-hidden-input></ark-checkbox-hidden-input></label></ark-checkbox>
    <ark-tabs default-value="a">
      <ark-tabs-list>
        <ark-tabs-trigger value="a"><button>A</button></ark-tabs-trigger>
        <ark-tabs-trigger value="b"><button>B</button></ark-tabs-trigger>
      </ark-tabs-list>
    </ark-tabs>
    <ark-select multiple>
      <ark-select-list>
        <ark-select-item value="react"><ark-select-item-text>React</ark-select-item-text></ark-select-item>
        <ark-select-item value="solid"><ark-select-item-text>Solid</ark-select-item-text></ark-select-item>
      </ark-select-list>
    </ark-select>`
  const toggle = document.querySelector('ark-toggle')!
  const checkbox = document.querySelector('ark-checkbox')!
  const tabs = document.querySelector('ark-tabs')!
  const select = document.querySelector('ark-select')!
  await Promise.all([toggle.ready, checkbox.ready, tabs.ready, select.ready])
  const events: string[] = []
  for (const element of [toggle, checkbox, tabs, select]) {
    for (const type of ['pressedchange', 'checkedchange', 'valuechange', 'openchange']) {
      element.addEventListener(type, () => events.push(`${element.localName}:${type}`))
    }
  }
  expect(toggle.pressed).toBe(false)
  expect(checkbox.checked).toBe(false)
  expect(tabs.value).toBe('a')
  expect(select.value).toEqual([])

  toggle.pressed = true
  checkbox.checked = true
  tabs.value = 'b'
  select.value = ['solid']

  await waitFor(() => expect(toggle.querySelector('button')).toHaveAttribute('aria-pressed', 'true'))
  await waitFor(() => expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true'))
  await waitFor(() => expect(checkbox.querySelector('input')).toBeChecked())
  expect(toggle.pressed).toBe(true)
  expect(checkbox.checked).toBe(true)
  expect(tabs.value).toBe('b')
  expect(select.value).toEqual(['solid'])
  expect(events).toEqual([])
})

test('a controlled attribute wins over a property write', async () => {
  document.body.innerHTML = /* html */ `<ark-toggle pressed="false"><button>Bold</button></ark-toggle>`
  const toggle = document.querySelector('ark-toggle')!
  await toggle.ready

  toggle.pressed = true

  await waitFor(() => expect(toggle.pressed).toBe(false))
  expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'false')
})

test('a value written before the element is connected applies once it starts', async () => {
  const toggle = document.createElement('ark-toggle')
  toggle.innerHTML = '<button>Bold</button>'
  const events: unknown[] = []
  toggle.addEventListener('pressedchange', (event) => events.push(event.detail))

  toggle.pressed = true

  expect(toggle.pressed).toBe(true)

  document.body.append(toggle)
  await toggle.ready

  await waitFor(() => expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true'))
  expect(toggle.pressed).toBe(true)
  expect(events).toEqual([])
})

test('a checkbox group value can be written without a change event', async () => {
  document.body.innerHTML = /* html */ `
    <ark-checkbox-group>
      <ark-checkbox value="a"><label><ark-checkbox-control></ark-checkbox-control><ark-checkbox-label>A</ark-checkbox-label></label></ark-checkbox>
      <ark-checkbox value="b"><label><ark-checkbox-control></ark-checkbox-control><ark-checkbox-label>B</ark-checkbox-label></label></ark-checkbox>
    </ark-checkbox-group>`
  const group = document.querySelector('ark-checkbox-group')!
  const events: unknown[] = []
  group.addEventListener('valuechange', (event) => events.push(event.detail))
  const [a, b] = document.querySelectorAll('ark-checkbox')
  await Promise.all([a.ready, b.ready])

  group.value = ['b']

  await waitFor(() => expect(b.checked).toBe(true))
  expect(group.value).toEqual(['b'])
  expect(a.checked).toBe(false)
  expect(events).toEqual([])
})
