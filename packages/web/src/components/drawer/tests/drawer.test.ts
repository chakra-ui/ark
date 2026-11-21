import { expect, test } from '@playwright/test'
import type {} from '../index.js'

const story = (name: string) => `/iframe.html?id=components-drawer--${name}&viewMode=story`

test('trigger opens the drawer and Escape closes it, restoring focus', async ({ page }) => {
  await page.goto(story('basic'))
  const trigger = page.locator('ark-drawer-trigger > button')
  const dialog = page.getByRole('dialog')

  await trigger.click()
  await expect(dialog).toBeVisible()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(dialog).toHaveAccessibleName('Drawer Title')
  await expect.poll(() => dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true)

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(trigger).toBeFocused()
})

test('close trigger closes the drawer and emits openchange', async ({ page }) => {
  await page.goto(story('basic'))
  await page.locator('ark-drawer').waitFor({ state: 'attached' })
  await page.evaluate(() => {
    const el = document.querySelector('ark-drawer')!
    el.addEventListener('openchange', (event) => el.setAttribute('data-last', String(event.detail.open)))
  })

  await page.getByRole('button', { name: 'Open' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.locator('ark-drawer')).toHaveAttribute('data-last', 'true')

  await page.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page.locator('ark-drawer')).toHaveAttribute('data-last', 'false')
})

test('controlled drawer waits for the open attribute', async ({ page }) => {
  await page.goto(story('controlled'))
  const drawer = page.locator('ark-drawer')
  const dialog = page.getByRole('dialog')

  await page.getByRole('button', { name: 'Open Drawer' }).click()
  await expect(dialog).toBeVisible()
  await expect(page.locator('output')).toHaveText('Open: true')

  await page.evaluate(() => {
    const el = document.querySelector('ark-drawer')!
    el.addEventListener('openchange', (event) => event.stopImmediatePropagation(), { capture: true })
  })
  await page.getByRole('button', { name: 'Close', exact: true }).click()
  await expect(dialog).toBeVisible()

  await drawer.evaluate((el) => el.setAttribute('open', 'false'))
  await expect(dialog).toBeHidden()
})

test('dragging the content down past the threshold closes the drawer', async ({ page }) => {
  await page.goto(story('basic'))
  await page.getByRole('button', { name: 'Open' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAttribute('data-state', 'open')
  await page.waitForFunction(() => document.getAnimations().length === 0)

  const title = page.locator('ark-drawer-title')
  const box = (await title.boundingBox())!
  const viewport = page.viewportSize()!
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2

  await page.mouse.move(x, y)
  await page.mouse.down()
  for (let step = 1; step <= 20; step++) {
    await page.mouse.move(x, y + ((viewport.height - y) * step) / 20)
  }
  await expect(dialog).toHaveAttribute('data-dragging', '')
  await page.mouse.up()

  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: 'Open' })).toHaveAttribute('aria-expanded', 'false')
})
