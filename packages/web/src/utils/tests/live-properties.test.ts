import { expect, test } from '@playwright/test'
import type {} from '../../index.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
})

const dialogMarkup = /* html */ `
  <ark-dialog>
    <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
    <ark-dialog-positioner>
      <ark-dialog-content><ark-dialog-title>Title</ark-dialog-title><button>Inside</button></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

test('setting a live property updates state without dispatching a change event', async ({ page }) => {
  await page.setContent(dialogMarkup)
  const read = await page.evaluate(async () => {
    const dialog = document.querySelector('ark-dialog')!
    await new Promise(requestAnimationFrame)
    const events: string[] = []
    dialog.addEventListener('openchange', (event) => events.push(String(event.detail.open)))
    Object.assign(window, { events })
    const before = dialog.open
    dialog.open = true
    return { before, immediate: dialog.open }
  })
  expect(read).toEqual({ before: false, immediate: true })
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(await page.evaluate(() => document.querySelector('ark-dialog')!.open)).toBe(true)

  await page.evaluate(() => (document.querySelector('ark-dialog')!.open = false))
  await expect(page.getByRole('dialog')).toBeHidden()
  expect(await page.evaluate(() => (window as any).events)).toEqual([])

  await page.getByRole('button', { name: 'Open' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(await page.evaluate(() => (window as any).events)).toEqual(['true'])
})

test('live properties read and write the machine values of each component', async ({ page }) => {
  await page.setContent(/* html */ `
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
    </ark-select>`)
  const result = await page.evaluate(async () => {
    await new Promise(requestAnimationFrame)
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
    await new Promise((resolve) => setTimeout(resolve, 50))
    return {
      initial,
      next: { pressed: toggle.pressed, checked: checkbox.checked, tab: tabs.value, value: select.value },
      ariaPressed: toggle.querySelector('button')!.getAttribute('aria-pressed'),
      events,
    }
  })
  expect(result.initial).toEqual({ pressed: false, checked: false, tab: 'a', value: [] })
  expect(result.next).toEqual({ pressed: true, checked: true, tab: 'b', value: ['solid'] })
  expect(result.ariaPressed).toBe('true')
  expect(result.events).toEqual([])
})

test('the controlled attribute wins over property writes', async ({ page }) => {
  await page.setContent(/* html */ `<ark-toggle pressed="false"><button>Bold</button></ark-toggle>`)
  const pressed = await page.evaluate(async () => {
    const toggle = document.querySelector('ark-toggle')!
    await new Promise(requestAnimationFrame)
    toggle.pressed = true
    await new Promise((resolve) => setTimeout(resolve, 50))
    return toggle.pressed
  })
  expect(pressed).toBe(false)
  await expect(page.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'false')
})

test('values written before connection apply once the machine starts', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const toggle = document.createElement('ark-toggle')
    toggle.innerHTML = '<button>Bold</button>'
    toggle.pressed = true
    const early = toggle.pressed
    const events: unknown[] = []
    toggle.addEventListener('pressedchange', (event) => events.push(event.detail))
    document.body.append(toggle)
    await new Promise((resolve) => setTimeout(resolve, 50))
    return { early, pressed: toggle.pressed, events }
  })
  expect(result).toEqual({ early: true, pressed: true, events: [] })
  await expect(page.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true')
})

test('checkbox group value can be written without an event', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-checkbox-group>
      <ark-checkbox value="a"><label><ark-checkbox-control></ark-checkbox-control><ark-checkbox-label>A</ark-checkbox-label></label></ark-checkbox>
      <ark-checkbox value="b"><label><ark-checkbox-control></ark-checkbox-control><ark-checkbox-label>B</ark-checkbox-label></label></ark-checkbox>
    </ark-checkbox-group>`)
  const result = await page.evaluate(async () => {
    const group = document.querySelector('ark-checkbox-group')!
    const events: unknown[] = []
    group.addEventListener('valuechange', (event) => events.push(event.detail))
    await new Promise(requestAnimationFrame)
    group.value = ['b']
    await new Promise((resolve) => setTimeout(resolve, 50))
    const [a, b] = document.querySelectorAll('ark-checkbox')
    return { value: group.value, a: a.checked, b: b.checked, events }
  })
  expect(result).toEqual({ value: ['b'], a: false, b: true, events: [] })
})
