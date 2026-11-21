import { expect, type Locator, test } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-virtualizer--${name}&viewMode=story`

const renderedIndexes = (list: Locator) =>
  list.locator('[data-index]').evaluateAll((items) => items.map((item) => Number(item.getAttribute('data-index'))))

test('list renders only a window of items', async ({ page }) => {
  await page.goto(story('list'))
  const list = page.getByTestId('list')
  await expect(list).toHaveAttribute('role', 'list')
  await expect(list.locator('[data-index="0"]')).toHaveText('Item 1')
  await expect(list.locator('[data-index="0"]')).toHaveAttribute('aria-setsize', '10000')

  const indexes = await renderedIndexes(list)
  expect(indexes.length).toBeGreaterThan(5)
  expect(indexes.length).toBeLessThan(50)
  await expect(list.locator('[data-index="9999"]')).toHaveCount(0)
})

test('scrolling changes the rendered window', async ({ page }) => {
  await page.goto(story('list'))
  const list = page.getByTestId('list')
  await expect(list.locator('[data-index="0"]')).toBeVisible()

  await list.evaluate((el) => {
    el.scrollTop = 48 * 5000
  })

  await expect(list.locator('[data-index="5000"]')).toBeVisible()
  await expect(list.locator('[data-index="0"]')).toHaveCount(0)
  await expect(list.locator('[data-index="5000"]')).toHaveAttribute('aria-posinset', '5001')
})

test('scrollToIndex brings a far item into the DOM', async ({ page }) => {
  await page.goto(story('scroll-to-index'))
  const list = page.getByTestId('list')
  await expect(list.locator('[data-index="0"]')).toBeVisible()
  await expect(list.locator('[data-index="9999"]')).toHaveCount(0)

  await page.getByRole('button', { name: 'Scroll to bottom' }).click()
  await expect(list.locator('[data-index="9999"]')).toBeVisible()
  await expect(list.locator('[data-index="9999"]')).toHaveText('Item 10000')

  await page.getByRole('button', { name: 'Scroll to top' }).click()
  await expect(list.locator('[data-index="0"]')).toBeVisible()
})
