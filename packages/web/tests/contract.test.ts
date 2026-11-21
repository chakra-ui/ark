import { expect, test } from '@playwright/test'
import type { DatePickerElement, PaginationElement, SelectElement } from '../src/index.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
})

test('function properties survive an upgrade, replacement, clearing and reconnect', async ({ page }) => {
  await page.addInitScript(() => {
    const picker = document.createElement('ark-date-picker') as DatePickerElement
    picker.isDateUnavailable = (date) => date.day === 25
    Object.assign(window, { earlyPicker: picker })
  })
  await page.reload()
  const result = await page.evaluate(async () => {
    const picker = (window as any).earlyPicker as DatePickerElement
    customElements.upgrade(picker)
    const ownProperty = Object.hasOwn(picker, 'isDateUnavailable')
    const early = typeof picker.isDateUnavailable
    document.body.append(picker)
    await new Promise(requestAnimationFrame)
    const date = (window as any).parseDate('2026-12-25')
    const state = () => picker.api!.getDayTableCellState({ value: date }).unavailable
    const initial = state()
    picker.isDateUnavailable = () => false
    const replaced = state()
    picker.remove()
    picker.isDateUnavailable = () => true
    document.body.append(picker)
    await new Promise(requestAnimationFrame)
    const reconnected = state()
    picker.isDateUnavailable = undefined
    const cleared = state()
    return { ownProperty, early, initial, replaced, reconnected, cleared }
  })
  expect(result).toEqual({
    ownProperty: false,
    early: 'function',
    initial: true,
    replaced: false,
    reconnected: true,
    cleared: false,
  })
})

test('formatters update DOM and setting the identical function does no work', async ({ page }) => {
  await page.setContent(`
    <ark-pagination count="100" page-size="10" type="link">
      <ark-pagination-item value="2"><a>Page 2</a></ark-pagination-item>
    </ark-pagination>`)
  await page.evaluate(() => {
    const pagination = document.querySelector('ark-pagination')!
    pagination.getPageUrl = ({ page }) => `/page/${page}`
  })
  await expect(page.getByRole('link')).toHaveAttribute('href', '/page/2')
  const result = await page.evaluate(() => {
    const pagination = document.querySelector('ark-pagination')!
    const render = pagination.render.bind(pagination)
    let renders = 0
    pagination.render = () => {
      renders++
      render()
    }
    const formatter = pagination.getPageUrl
    pagination.getPageUrl = formatter
    const identicalRenders = renders
    pagination.getPageUrl = ({ page }) => `/new/${page}`
    const replacementRenders = renders
    pagination.getPageUrl = undefined
    return { identicalRenders, replacementRenders, cleared: pagination.getPageUrl === undefined }
  })
  expect(result.identicalRenders).toBe(0)
  expect(result.replacementRenders).toBeGreaterThan(0)
  expect(result.cleared).toBe(true)
})

test('rich collection properties refresh templates and restore markup fallback', async ({ page }) => {
  await page.setContent(`
    <ark-select>
      <script type="application/json">["Fallback"]</script>
      <ark-select-list>
        <template><ark-select-item><ark-select-item-text></ark-select-item-text></ark-select-item></template>
      </ark-select-list>
    </ark-select>`)
  const items = page.locator('ark-select-item')
  await expect(items).toHaveCount(1)
  await page.evaluate(() => {
    document.querySelector('ark-select')!.items = ['React', 'Solid']
  })
  await expect(items).toHaveText(['React', 'Solid'])
  await page.evaluate(() => {
    document.querySelector('ark-select')!.items = []
  })
  await expect(items).toHaveCount(0)
  await page.evaluate(() => {
    document.querySelector('ark-select')!.items = undefined
  })
  await expect(items).toHaveText(['Fallback'])
})

test('notifications preserve details and compose through shadow roots without bubbling', async ({ page }) => {
  await page.evaluate(async () => {
    const host = document.createElement('div')
    const shadow = host.attachShadow({ mode: 'open' })
    shadow.innerHTML = `<ark-checkbox><label><ark-checkbox-control></ark-checkbox-control><ark-checkbox-label>Accept</ark-checkbox-label><ark-checkbox-hidden-input></ark-checkbox-hidden-input></label></ark-checkbox>`
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
  await page.setContent(`
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

test('async transformers preserve promises and custom validation returns file errors', async ({ page }) => {
  await page.setContent(
    `<ark-file-upload><ark-file-upload-hidden-input></ark-file-upload-hidden-input></ark-file-upload>`,
  )
  await page.evaluate(() => {
    const upload = document.querySelector('ark-file-upload')!
    upload.validate = (file) =>
      file.name === 'reject.txt' ? [{ code: 'FILE_INVALID', message: 'Rejected by the application' }] : null
    upload.transformFiles = async (files) => {
      await new Promise((resolve) => setTimeout(resolve, 20))
      return files.map((file) => new File([file], `processed-${file.name}`, { type: file.type }))
    }
    const accepted: string[] = []
    const rejected: string[] = []
    upload.addEventListener('filechange', (event) =>
      accepted.push(...event.detail.acceptedFiles.map((file) => file.name)),
    )
    upload.addEventListener('filereject', (event) =>
      rejected.push(...event.detail.files.map((entry) => entry.file.name)),
    )
    Object.assign(window, { accepted, rejected })
  })
  await page
    .locator('input[type=file]')
    .setInputFiles({ name: 'hello.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') })
  await expect.poll(() => page.evaluate(() => (window as any).accepted)).toContain('processed-hello.txt')
  await page
    .locator('input[type=file]')
    .setInputFiles({ name: 'reject.txt', mimeType: 'text/plain', buffer: Buffer.from('reject') })
  await expect.poll(() => page.evaluate(() => (window as any).rejected)).toContain('reject.txt')
})
