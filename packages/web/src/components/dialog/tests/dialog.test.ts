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
