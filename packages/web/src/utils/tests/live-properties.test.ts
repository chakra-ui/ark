import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import '@ark-ui/web/checkbox'
import '@ark-ui/web/dialog'
import '@ark-ui/web/select'
import '@ark-ui/web/tabs'
import '@ark-ui/web/toggle'

const user = userEvent.setup()

const nextFrame = () => new Promise(requestAnimationFrame)

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const dialogMarkup = /* html */ `
  <ark-dialog>
    <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
    <ark-dialog-positioner>
      <ark-dialog-content><ark-dialog-title>Title</ark-dialog-title><button>Inside</button></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

test('setting a live property updates state without dispatching a change event', async () => {
  document.body.innerHTML = dialogMarkup
  const dialog = document.querySelector('ark-dialog')!
  await nextFrame()

  const events: string[] = []
  dialog.addEventListener('openchange', (event) => events.push(String(event.detail.open)))

  const before = dialog.open
  dialog.open = true
  expect({ before, immediate: dialog.open }).toEqual({ before: false, immediate: true })

  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
  expect(dialog.open).toBe(true)

  dialog.open = false
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  expect(events).toEqual([])

  await user.click(screen.getByRole('button', { name: 'Open' }))
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
  expect(events).toEqual(['true'])
})

test('live properties read and write the machine values of each component', async () => {
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
  await nextFrame()

  const toggle = document.querySelector('ark-toggle')!
  const checkbox = document.querySelector('ark-checkbox')!
  const tabs = document.querySelector('ark-tabs')!
  const select = document.querySelector('ark-select')!

  const events: string[] = []
  for (const el of [toggle, checkbox, tabs, select]) {
    for (const type of ['pressedchange', 'checkedchange', 'valuechange', 'openchange']) {
      el.addEventListener(type, () => events.push(`${el.localName}:${type}`))
    }
  }

  const initial = { pressed: toggle.pressed, checked: checkbox.checked, tab: tabs.value, value: select.value }

  toggle.pressed = true
  checkbox.checked = true
  tabs.value = 'b'
  select.value = ['solid']
  await wait(50)

  expect(initial).toEqual({ pressed: false, checked: false, tab: 'a', value: [] })
  expect({ pressed: toggle.pressed, checked: checkbox.checked, tab: tabs.value, value: select.value }).toEqual({
    pressed: true,
    checked: true,
    tab: 'b',
    value: ['solid'],
  })
  expect(toggle.querySelector('button')).toHaveAttribute('aria-pressed', 'true')
  expect(events).toEqual([])
})

test('the controlled attribute wins over property writes', async () => {
  document.body.innerHTML = /* html */ `<ark-toggle pressed="false"><button>Bold</button></ark-toggle>`
  const toggle = document.querySelector('ark-toggle')!
  await nextFrame()

  toggle.pressed = true
  await wait(50)

  expect(toggle.pressed).toBe(false)
  expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'false')
})

test('values written before connection apply once the machine starts', async () => {
  const toggle = document.createElement('ark-toggle')
  toggle.innerHTML = '<button>Bold</button>'
  toggle.pressed = true
  const early = toggle.pressed

  const events: unknown[] = []
  toggle.addEventListener('pressedchange', (event) => events.push(event.detail))

  document.body.append(toggle)
  await wait(50)

  expect({ early, pressed: toggle.pressed, events }).toEqual({ early: true, pressed: true, events: [] })
  await waitFor(() => expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true'))
})

test('checkbox group value can be written without an event', async () => {
  document.body.innerHTML = /* html */ `
    <ark-checkbox-group>
      <ark-checkbox value="a"><label><ark-checkbox-control></ark-checkbox-control><ark-checkbox-label>A</ark-checkbox-label></label></ark-checkbox>
      <ark-checkbox value="b"><label><ark-checkbox-control></ark-checkbox-control><ark-checkbox-label>B</ark-checkbox-label></label></ark-checkbox>
    </ark-checkbox-group>`
  const group = document.querySelector('ark-checkbox-group')!

  const events: unknown[] = []
  group.addEventListener('valuechange', (event) => events.push(event.detail))
  await nextFrame()

  group.value = ['b']
  await wait(50)

  const [a, b] = document.querySelectorAll('ark-checkbox')
  expect({ value: group.value, a: a.checked, b: b.checked, events }).toEqual({
    value: ['b'],
    a: false,
    b: true,
    events: [],
  })
})
