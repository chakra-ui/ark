import { expect, test } from '@playwright/test'

test('select supports keyboard selection and native form integration', async ({ page }) => {
  await page.goto('/iframe.html?id=components-select--basic&viewMode=story')
  const trigger = page.locator('ark-select-trigger button')
  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('listbox')).toBeVisible()
  await expect(page.getByRole('listbox')).toBeFocused()
  await page.keyboard.press('ArrowUp')
  await expect(page.getByRole('option', { name: 'Solid', exact: true })).toHaveAttribute('data-highlighted', '')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('listbox')).not.toBeVisible()
  const selected = await page.locator('ark-select').evaluate((el) => {
    const select = el.querySelector('select')!
    return { text: el.querySelector('ark-select-value-text')!.textContent, value: select.selectedOptions[0]?.text }
  })
  expect(selected.text).toBeTruthy()
  expect(selected.text).toBe(selected.value)
})

test('select works inside a shadow root', async ({ page }) => {
  await page.goto('/iframe.html?id=components-select--shadow-root&viewMode=story')
  await page.locator('ark-select-trigger button').click()
  await expect(page.getByRole('listbox')).toBeVisible()
  await page.getByRole('option').first().click()
  await expect(page.getByRole('listbox')).not.toBeVisible()
})

const story = (name: string) => `/iframe.html?id=components-select--${name}&viewMode=story`

test('select object items render through the collection and submit their key', async ({ page }) => {
  await page.goto(story('custom-object'))
  await page.locator('ark-select-trigger button').click()
  await expect(page.getByRole('group')).toHaveCount(2)
  await expect(page.getByRole('option', { name: 'Alan Turing' })).toHaveAttribute('aria-disabled', 'true')
  await page.getByRole('option', { name: 'Katherine Johnson' }).click()
  await expect(page.locator('ark-select-value-text')).toHaveText('Katherine Johnson')
  await expect(page.getByTestId('selection')).toHaveText('Katherine Johnson works in Research')
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page.locator('output')).toHaveText('Submitted: katherine')
})

test('select separates visible groups with a border', async ({ page }) => {
  await page.goto(story('custom-object'))
  await page.locator('ark-select-trigger button').click()
  const widths = await page
    .getByRole('group')
    .evaluateAll((groups) => groups.map((group) => getComputedStyle(group).borderTopWidth))
  expect(widths[0]).toBe('0px')
  expect(widths[1]).not.toBe('0px')
})

test('select renders bare items and groups without a template', async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
  await page.setContent(/* html */ `
    <form>
      <ark-select name="fruit">
        <ark-select-trigger><button type="button">Open</button></ark-select-trigger>
        <ark-select-positioner>
          <ark-select-content><ark-select-list></ark-select-list></ark-select-content>
        </ark-select-positioner>
      </ark-select>
    </form>`)
  await page.evaluate(() => {
    const { createListCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-select')!.collection = createListCollection({
      items: [
        { id: 'a', name: 'Apple', kind: 'Fruit' },
        { id: 'c', name: 'Carrot', kind: 'Vegetable' },
      ],
      itemToValue: (item) => item.id,
      itemToString: (item) => item.name,
      groupBy: (item) => item.kind,
    })
  })
  const items = page.locator('ark-select-item')
  await expect(items).toHaveText(['Apple', 'Carrot'])
  await expect(items).toHaveCount(2)
  await expect(page.locator('ark-select-item-group')).toHaveCount(2)
  await expect(page.locator('ark-select-item-group-label')).toHaveText(['Fruit', 'Vegetable'])
  await expect(items.first()).toHaveAttribute('value', 'a')
  await expect(items.nth(1)).toHaveAttribute('aria-posinset', '2')
  await expect(items.nth(1)).toHaveAttribute('aria-setsize', '2')

  await page.locator('ark-select-trigger button').click()
  await page.getByRole('option', { name: 'Carrot' }).click()
  const submitted = await page.evaluate(() => new FormData(document.querySelector('form')!).get('fruit'))
  expect(submitted).toBe('c')

  await page.evaluate(() => {
    const { createListCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-select')!.collection = createListCollection({ items: ['Kiwi', 'Lime', 'Mango'] })
  })
  await expect(items).toHaveText(['Kiwi', 'Lime', 'Mango'])
  await expect(page.locator('ark-select-item-group')).toHaveCount(0)
  await expect(page.locator('ark-select select option')).toHaveText(['Kiwi', 'Lime', 'Mango'])
})

test('select keyboard navigation reaches off-screen items in a virtualized list', async ({ page }) => {
  await page.goto(story('virtualized'))
  await page.locator('ark-select-trigger button').focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('listbox')).toBeFocused()
  await page.keyboard.press('End')
  const last = page.getByRole('option', { name: 'Item 5000', exact: true })
  await expect(last).toHaveAttribute('data-highlighted', '')
  await expect(last).toHaveAttribute('aria-posinset', '5000')
  await expect(last).toHaveAttribute('aria-setsize', '5000')
  expect(await page.locator('ark-select-item').count()).toBeLessThan(100)
  await page.keyboard.press('Enter')
  await expect(page.locator('ark-select-value-text')).toHaveText('Item 5000')
})

test('collection properties refresh templates and restore the JSON fallback', async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
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
    const { createListCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-select')!.collection = createListCollection({ items: ['React', 'Solid'] })
  })
  await expect(items).toHaveText(['React', 'Solid'])
  await page.evaluate(() => {
    const { createListCollection } = window as unknown as typeof import('../../../index.js')
    document.querySelector('ark-select')!.collection = createListCollection<string>({ items: [] })
  })
  await expect(items).toHaveCount(0)
  await page.evaluate(() => {
    document.querySelector('ark-select')!.collection = undefined
  })
  await expect(items).toHaveText(['Fallback'])
})
