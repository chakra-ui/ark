import { expect, test } from '@playwright/test'

test('dialog supports keyboard dismissal and restores trigger focus', async ({ page }) => {
  await page.goto('/iframe.html?id=components-dialog--basic&viewMode=story')
  const trigger = page.getByRole('button', { name: 'Open Dialog', exact: true })
  await trigger.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

test('portalled dialog content opens, traps focus and closes', async ({ page }) => {
  await page.goto('/iframe.html?id=components-dialog--portal&viewMode=story')
  const trigger = page.getByRole('button', { name: 'Open Dialog', exact: true })
  const dialog = page.getByRole('dialog')
  await expect(page.locator('.portal ark-dialog-content')).toHaveCount(1)
  await trigger.click()
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAccessibleName('Portalled Dialog')
  await page.getByRole('button', { name: 'Confirm' }).focus()
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('Tab')
    await expect(dialog.locator(':focus')).toHaveCount(1)
  }
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
})
