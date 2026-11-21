import { expect, test } from '@playwright/test'
import type {} from '../../index.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
})

const checkboxMarkup = /* html */ `
  <ark-checkbox>
    <label>
      <ark-checkbox-control></ark-checkbox-control>
      <ark-checkbox-label>Accept</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

const recordDetails = (selector: string, type: string) =>
  `document.querySelector('${selector}').addEventListener('${type}', (event) => window.details.push(event.detail))`

test('user interaction reports the input source', async ({ page }) => {
  await page.setContent(checkboxMarkup)
  await page.evaluate(`window.details = []; ${recordDetails('ark-checkbox', 'checkedchange')}`)
  await page.getByText('Accept', { exact: true }).click()
  await page.getByRole('checkbox').focus()
  await page.keyboard.press('Space')
  await expect
    .poll(() => page.evaluate(() => (window as any).details))
    .toEqual([
      { checked: true, source: 'mouse' },
      { checked: false, source: 'keyboard' },
    ])
})

test('api calls report a programmatic source, even after recent input', async ({ page }) => {
  await page.setContent(checkboxMarkup)
  await page.evaluate(`window.details = []; ${recordDetails('ark-checkbox', 'checkedchange')}`)
  await page.getByText('Accept', { exact: true }).click()
  await page.evaluate(async () => {
    await new Promise((resolve) => setTimeout(resolve, 20))
    document.querySelector('ark-checkbox')!.api!.setChecked(false)
  })
  await expect
    .poll(() => page.evaluate(() => (window as any).details))
    .toEqual([
      { checked: true, source: 'mouse' },
      { checked: false, source: 'programmatic' },
    ])
})

test('bare callback values are wrapped in an object with a source', async ({ page }) => {
  await page.setContent(/* html */ `<ark-toggle><button>Bold</button></ark-toggle>`)
  await page.evaluate(`window.details = []; ${recordDetails('ark-toggle', 'pressedchange')}`)
  await page.getByRole('button', { name: 'Bold' }).click()
  await expect.poll(() => page.evaluate(() => (window as any).details)).toEqual([{ pressed: true, source: 'mouse' }])
})

test('zag reasons are kept alongside the source', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-dialog>
      <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
      <ark-dialog-positioner>
        <ark-dialog-content><ark-dialog-title>Title</ark-dialog-title><button>Inside</button></ark-dialog-content>
      </ark-dialog-positioner>
    </ark-dialog>`)
  await page.evaluate(`window.details = []; ${recordDetails('ark-dialog', 'openchange')}`)
  await page.getByRole('button', { name: 'Open' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await page.evaluate(async () => {
    await new Promise((resolve) => setTimeout(resolve, 20))
    document.querySelector('ark-dialog')!.api!.setOpen(true)
  })
  await expect
    .poll(() => page.evaluate(() => (window as any).details))
    .toEqual([
      { open: true, reason: 'trigger-click', source: 'mouse' },
      { open: false, reason: 'escape-key', source: 'keyboard' },
      { open: true, reason: 'script', source: 'programmatic' },
    ])
})

test('notifications preserve details and compose through shadow roots without bubbling', async ({ page }) => {
  await page.evaluate(async () => {
    const host = document.createElement('div')
    const shadow = host.attachShadow({ mode: 'open' })
    shadow.innerHTML = /* html */ `<ark-checkbox><label><ark-checkbox-control></ark-checkbox-control><ark-checkbox-label>Accept</ark-checkbox-label><ark-checkbox-hidden-input></ark-checkbox-hidden-input></label></ark-checkbox>`
    document.body.append(host)
    const received: unknown[] = []
    const bubbled: string[] = []
    const record = (place: string, event: Event) => {
      const change = event as CustomEvent<{ checked: boolean }>
      received.push({
        place,
        checked: change.detail.checked,
        bubbles: change.bubbles,
        composed: change.composed,
        cancelable: change.cancelable,
      })
    }
    shadow.querySelector('ark-checkbox')!.addEventListener('checkedchange', (event) => record('root', event))
    shadow.addEventListener('checkedchange', () => bubbled.push('shadow'))
    document.addEventListener('checkedchange', () => bubbled.push('document'))
    document.addEventListener('checkedchange', (event) => record('capture', event), { capture: true })
    Object.assign(window, { received, bubbled })
  })
  await page.getByText('Accept', { exact: true }).click()
  const result = await page.evaluate(() => ({ received: (window as any).received, bubbled: (window as any).bubbled }))
  expect(result.bubbled).toEqual([])
  expect(result.received).toEqual([
    { place: 'capture', checked: true, bubbles: false, composed: true, cancelable: false },
    { place: 'root', checked: true, bubbles: false, composed: true, cancelable: false },
  ])
})

test('escape notifications forward cancellation to the original keyboard event', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-dialog>
      <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
      <ark-dialog-positioner><ark-dialog-content><ark-dialog-title>Confirm</ark-dialog-title><button>Inside</button></ark-dialog-content></ark-dialog-positioner>
    </ark-dialog>`)
  await page.evaluate(() => {
    document.querySelector('ark-dialog')!.addEventListener(
      'escapekeydown',
      (event) => {
        if (event.detail.key === 'Escape') event.preventDefault()
      },
      { once: true },
    )
  })
  await page.getByRole('button', { name: 'Open', exact: true }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
})
