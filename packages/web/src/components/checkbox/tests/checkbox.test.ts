import { expect, test } from '@playwright/test'

test('checkbox group enforces its maximum and submits native form values', async ({ page }) => {
  await page.goto('/iframe.html?id=components-checkbox--group-with-max-selected&viewMode=story')
  const inputs = page.locator('input[type=checkbox]')
  await expect(inputs).toHaveCount(4)
  await expect(inputs.nth(0)).toBeChecked()
  await page.getByText('Solid', { exact: true }).click()
  await expect(inputs.nth(1)).toBeChecked()
  await expect(inputs.nth(2)).toBeDisabled()
  await page.getByText('React', { exact: true }).click()
  await expect(inputs.nth(2)).toBeEnabled()

  await page.goto('/iframe.html?id=components-checkbox--group-with-form&viewMode=story')
  await page.getByText('Solid', { exact: true }).click()
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page.locator('output')).toHaveText('["react","solid"]')
})

test('controlled checkbox can disconnect and reconnect without duplicate events', async ({ page }) => {
  await page.goto('/iframe.html?id=components-checkbox--controlled&viewMode=story')
  const input = page.locator('input[type=checkbox]')
  await expect(input).toBeChecked()
  await page.evaluate(async () => {
    const el = document.querySelector('ark-checkbox')!
    const parent = el.parentElement!
    let changes = 0
    el.addEventListener('checkedchange', () => el.setAttribute('data-changes', String(++changes)))
    for (let i = 0; i < 3; i++) {
      el.remove()
      parent.append(el)
      await new Promise(requestAnimationFrame)
    }
  })
  await page.getByText('Checkbox', { exact: true }).click()
  await expect(input).not.toBeChecked()
  await expect(page.locator('ark-checkbox')).toHaveAttribute('data-changes', '1')
  await expect(page.locator('output')).toHaveText('checked: false')
})
