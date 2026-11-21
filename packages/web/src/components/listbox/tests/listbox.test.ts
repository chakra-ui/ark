import { expect, test } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-listbox--${name}&viewMode=story`

test('listbox keyboard navigation reaches off-screen items in a virtualized list', async ({ page }) => {
  await page.goto(story('virtualized'))
  const first = page.getByRole('option', { name: 'Item 1', exact: true })
  await first.click()
  await page.keyboard.press('End')
  const last = page.getByRole('option', { name: 'Item 5000', exact: true })
  await expect(last).toHaveAttribute('data-highlighted', '')
  await expect(last).toHaveAttribute('aria-posinset', '5000')
  await expect(last).toHaveAttribute('aria-setsize', '5000')
  await expect(first).toHaveCount(0)
  expect(await page.locator('ark-listbox-item').count()).toBeLessThan(100)
  await page.keyboard.press('Home')
  await expect(first).toHaveAttribute('data-highlighted', '')
})

test('listbox loads the next page when the sentinel scrolls into view', async ({ page }) => {
  await page.goto(story('load-more'))
  const options = page.getByRole('option')
  await expect(options).toHaveCount(20)
  await page.locator('[data-sentinel]').scrollIntoViewIfNeeded()
  await expect(options).toHaveCount(40)
  await expect(options.last()).toHaveText('Pokémon #40')
  await expect(options.last()).toHaveAttribute('aria-setsize', '40')
})

test('listbox replaces its items when a new collection is assigned', async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
  await page.setContent(/* html */ `
    <ark-listbox>
      <ark-listbox-content><ark-listbox-list></ark-listbox-list></ark-listbox-content>
    </ark-listbox>`)
  await page.evaluate(() => {
    const { createListCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-listbox')!.collection = createListCollection({ items: ['One', 'Two'] })
  })
  const options = page.getByRole('option')
  await expect(options).toHaveText(['One', 'Two'])
  await page.evaluate(() => {
    const { createListCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-listbox')!.collection = createListCollection({
      items: [{ value: 'three', label: 'Three', disabled: true }],
    })
  })
  await expect(options).toHaveText(['Three'])
  await expect(options).toHaveAttribute('aria-disabled', 'true')
})

test('collection properties win over markup, which returns once they are cleared', async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
  await page.setContent(/* html */ `
    <ark-listbox>
      <ark-listbox-list>
        <ark-listbox-item value="markup"><ark-listbox-item-text>Markup</ark-listbox-item-text></ark-listbox-item>
      </ark-listbox-list>
    </ark-listbox>`)
  const listbox = page.locator('ark-listbox')
  await page.evaluate(() => {
    const { createListCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-listbox')!.collection = createListCollection({ items: ['data'] })
  })
  await expect(page.locator('ark-listbox-item[data-rendered]')).toHaveText(['data'])
  await expect.poll(() => listbox.evaluate((el: any) => el.api.collection.getValues())).toEqual(['data'])
  await page.evaluate(() => {
    document.querySelector('ark-listbox')!.collection = undefined
  })
  await expect(page.locator('ark-listbox-item[data-rendered]')).toHaveCount(0)
  await expect.poll(() => listbox.evaluate((el: any) => el.api.collection.getValues())).toEqual(['markup'])
})
