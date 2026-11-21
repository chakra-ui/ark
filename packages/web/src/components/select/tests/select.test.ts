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
