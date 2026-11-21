import { expect, test } from '@playwright/test'
import type {} from '../../index.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
})

const positioner = /* html */ `
  <ark-dialog-positioner for="external">
    <ark-dialog-content>
      <ark-dialog-title>External</ark-dialog-title>
      <button>First</button>
      <ark-dialog-close-trigger><button>Close</button></ark-dialog-close-trigger>
    </ark-dialog-content>
  </ark-dialog-positioner>`

test('a part moved to the body finds its root through for', async ({ page }) => {
  await page.setContent(/* html */ `
    <main>
      <ark-dialog id="external">
        <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
        ${positioner}
      </ark-dialog>
    </main>`)
  await page.evaluate(() => document.body.append(document.querySelector('ark-dialog-positioner')!))
  const dialog = page.getByRole('dialog')
  await page.getByRole('button', { name: 'Open' }).click()
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAccessibleName('External')
  expect(await page.evaluate(() => document.querySelector('ark-dialog-positioner')!.parentElement!.localName)).toBe(
    'body',
  )
  await page.getByRole('button', { name: 'Close' }).click()
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: 'Open' })).toBeFocused()
})

test('a part connects when the root it points at appears later', async ({ page }) => {
  await page.setContent(`<div id="portal">${positioner}</div>`)
  await page.evaluate(() => {
    const root = document.createElement('ark-dialog')
    root.id = 'external'
    root.innerHTML = '<ark-dialog-trigger><button>Open</button></ark-dialog-trigger>'
    document.body.prepend(root)
  })
  await page.getByRole('button', { name: 'Open' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
})

test('for only matches roots of the part’s own component', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-popover id="external"></ark-popover>
    ${positioner}`)
  await expect(page.locator('ark-dialog-content')).not.toHaveAttribute('data-scope')
})
