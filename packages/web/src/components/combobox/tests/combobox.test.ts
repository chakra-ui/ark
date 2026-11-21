import { expect, test } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-combobox--${name}&viewMode=story`

const borderTop = (locator: import('@playwright/test').Locator) =>
  locator.evaluate((el) => getComputedStyle(el).borderTopWidth)

test('combobox separates visible groups and drops the separator when filtering hides a group', async ({ page }) => {
  await page.goto(story('grouping'))
  const input = page.getByRole('combobox')
  await input.click()
  await input.press('ArrowDown')
  const groups = page.getByRole('group')
  await expect(groups).toHaveCount(2)
  expect(await borderTop(groups.nth(0))).toBe('0px')
  expect(await borderTop(groups.nth(1))).not.toBe('0px')

  await input.fill('carrot')
  await expect(page.getByRole('group', { name: 'Fruits' })).toBeHidden()
  const vegetables = page.getByRole('group', { name: 'Vegetables' })
  await expect(vegetables).toBeVisible()
  expect(await borderTop(vegetables)).toBe('0px')
})

test('combobox loading attribute sets aria-busy on the list', async ({ page }) => {
  await page.goto(story('async-search'))
  const list = page.locator('ark-combobox-list')
  await expect(list).not.toHaveAttribute('aria-busy')
  await page.getByRole('combobox').fill('nolan')
  await expect(page.locator('ark-combobox')).toHaveAttribute('loading')
  await expect(list).toHaveAttribute('aria-busy', 'true')
  await expect(page.getByRole('option')).toHaveText(['Inception', 'The Dark Knight', 'Interstellar'])
  await expect(page.locator('ark-combobox')).not.toHaveAttribute('loading')
  await expect(list).not.toHaveAttribute('aria-busy')
})

test('combobox keyboard navigation reaches off-screen items in a virtualized list', async ({ page }) => {
  await page.goto(story('virtualized'))
  const input = page.getByRole('combobox')
  await input.focus()
  await input.press('ArrowUp')
  const last = page.getByRole('option', { name: 'Item 5000', exact: true })
  await expect(last).toHaveAttribute('data-highlighted', '')
  await expect(last).toHaveAttribute('aria-posinset', '5000')
  await expect(last).toHaveAttribute('aria-setsize', '5000')
  expect(await page.locator('ark-combobox-item').count()).toBeLessThan(100)

  await input.fill('Item 42')
  await expect(page.getByRole('option').first()).toHaveText('Item 42')
  await expect(page.getByRole('option').first()).toHaveAttribute('aria-setsize', '111')
})

test('combobox renders bare items from a collection and updates when it is replaced', async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
  await page.setContent(/* html */ `
    <ark-combobox>
      <ark-combobox-input><input /></ark-combobox-input>
      <ark-combobox-positioner>
        <ark-combobox-content><ark-combobox-list></ark-combobox-list></ark-combobox-content>
      </ark-combobox-positioner>
    </ark-combobox>`)
  await page.evaluate(() => {
    const { createListCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-combobox')!.collection = createListCollection({ items: ['Apple', 'Banana'] })
  })
  const items = page.locator('ark-combobox-item')
  await expect(items).toHaveText(['Apple', 'Banana'])
  await expect(items.first()).toHaveAttribute('value', 'Apple')
  await page.evaluate(() => {
    const { createListCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-combobox')!.collection = createListCollection({ items: ['Cherry'] })
  })
  await expect(items).toHaveText(['Cherry'])
})
