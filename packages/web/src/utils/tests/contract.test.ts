import { expect, test } from '@playwright/test'
import type { DatePickerElement, PaginationElement, SelectElement } from '../../index.js'

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
  await page.setContent(/* html */ `
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
  await page.setContent(/* html */ `
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

test('async transformers preserve promises and custom validation returns file errors', async ({ page }) => {
  await page.setContent(
    /* html */ `<ark-file-upload><ark-file-upload-hidden-input></ark-file-upload-hidden-input></ark-file-upload>`,
  )
  await page.evaluate(() => {
    const upload = document.querySelector('ark-file-upload')!
    upload.validate = (file) => (file.name === 'reject.txt' ? ['FILE_INVALID'] : null)
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

test('as-child moves part props onto the first element child', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-collapsible>
      <ark-collapsible-trigger as-child><div tabindex="0">Toggle</div></ark-collapsible-trigger>
      <ark-collapsible-content as-child><section>Panel</section></ark-collapsible-content>
    </ark-collapsible>`)
  const trigger = page.locator('ark-collapsible-trigger > div')
  const content = page.locator('ark-collapsible-content > section')
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(trigger).toHaveAttribute('data-collapsible-trigger')
  await expect(page.locator('ark-collapsible-trigger')).not.toHaveAttribute('data-collapsible-trigger')
  await expect(content).toHaveAttribute('data-collapsible-content')
  await expect(content).toBeHidden()
  expect(await page.locator('ark-collapsible-content').evaluate((el) => getComputedStyle(el).display)).toBe('contents')

  await trigger.click()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(content).toBeVisible()
})

test('as-child moves root props onto the first element child', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-tabs as-child default-value="a">
      <section>
        <ark-tabs-list>
          <ark-tabs-trigger value="a"><button>A</button></ark-tabs-trigger>
        </ark-tabs-list>
        <ark-tabs-content value="a">Panel A</ark-tabs-content>
      </section>
    </ark-tabs>`)
  await expect(page.locator('ark-tabs > section')).toHaveAttribute('data-tabs-root')
  await expect(page.locator('ark-tabs')).not.toHaveAttribute('data-tabs-root')
  expect(await page.locator('ark-tabs').evaluate((el) => getComputedStyle(el).display)).toBe('contents')
})

test('as-child moves props to a replacement child and strips the old one', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-collapsible>
      <ark-collapsible-trigger as-child><div data-testid="old" tabindex="0">Old</div></ark-collapsible-trigger>
      <ark-collapsible-content>Panel</ark-collapsible-content>
    </ark-collapsible>`)
  await expect(page.getByTestId('old')).toHaveAttribute('aria-expanded', 'false')
  const old = await page.evaluate(() => {
    const host = document.querySelector('ark-collapsible-trigger')!
    const previous = host.firstElementChild!
    const next = document.createElement('a')
    next.dataset.testid = 'new'
    next.href = '#'
    next.textContent = 'New'
    previous.replaceWith(next)
    Object.assign(window, { previous })
    return (previous as HTMLElement).dataset.testid
  })
  expect(old).toBe('old')
  const next = page.getByTestId('new')
  await expect(next).toHaveAttribute('aria-expanded', 'false')
  const stale = await page.evaluate(() => {
    const previous = (window as any).previous as HTMLElement
    return ['aria-expanded', 'aria-controls', 'data-collapsible-trigger', 'id'].filter((name) =>
      previous.hasAttribute(name),
    )
  })
  expect(stale).toEqual([])
  await next.click()
  await expect(next).toHaveAttribute('aria-expanded', 'true')
})

test('as-child lazily mounts template children into the child', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-collapsible>
      <ark-collapsible-trigger><button>Toggle</button></ark-collapsible-trigger>
      <ark-collapsible-content as-child><section><template><p>Lazy</p></template></section></ark-collapsible-content>
    </ark-collapsible>`)
  await expect(page.locator('section p')).toHaveCount(0)
  await page.getByRole('button', { name: 'Toggle' }).click()
  await expect(page.locator('section > p')).toHaveText('Lazy')
})

test('as-child menu items accept arbitrary elements and keep keyboard navigation', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-menu>
      <ark-menu-trigger><button>Open</button></ark-menu-trigger>
      <ark-menu-positioner>
        <ark-menu-content>
          <ark-menu-list>
            <ark-menu-item value="docs" as-child><a href="#docs">Docs</a></ark-menu-item>
            <ark-menu-item value="settings" as-child><div>Settings</div></ark-menu-item>
          </ark-menu-list>
        </ark-menu-content>
      </ark-menu-positioner>
    </ark-menu>`)
  await page.getByRole('button', { name: 'Open' }).click()
  const items = page.getByRole('menuitem')
  await expect(items).toHaveCount(2)
  await expect(page.locator('ark-menu-item > div')).toHaveAttribute('role', 'menuitem')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await expect(page.locator('ark-menu-item > div')).toHaveAttribute('data-highlighted', '')
})
