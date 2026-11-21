import { expect, test, type Page } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-menubar--${name}&viewMode=story`

const trigger = (page: Page, name: string) => page.locator('ark-menu-trigger button', { hasText: name })

test('menubar moves focus between triggers and skips a disabled one', async ({ page }) => {
  await page.goto(story('basic'))
  await expect(page.getByRole('menubar')).toHaveAttribute('data-orientation', 'horizontal')
  await trigger(page, 'File').focus()
  await page.keyboard.press('ArrowRight')
  await expect(trigger(page, 'Edit')).toBeFocused()
  await expect(trigger(page, 'Edit')).toHaveAttribute('tabindex', '0')
  await page.keyboard.press('ArrowRight')
  await expect(trigger(page, 'View')).toBeFocused()
  await page.keyboard.press('ArrowLeft')
  await expect(trigger(page, 'Edit')).toBeFocused()
})

test('menubar switches to the next menu with ArrowRight while one is open', async ({ page }) => {
  await page.goto(story('basic'))
  await trigger(page, 'File').click()
  await expect(page.getByRole('menuitem', { name: 'New File' })).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('menuitem', { name: 'Undo' })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'New File' })).not.toBeVisible()
  await trigger(page, 'View').hover()
  await expect(page.getByRole('menuitem', { name: 'Zoom In' })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'Undo' })).not.toBeVisible()
})

test('menubar closes on Escape and returns focus to the trigger', async ({ page }) => {
  await page.goto(story('basic'))
  await trigger(page, 'Edit').focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: 'Undo' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('menuitem', { name: 'Undo' })).not.toBeVisible()
  await expect(trigger(page, 'Edit')).toBeFocused()
  await expect(page.getByRole('menubar')).toHaveAttribute('data-has-open-menu', 'false')
})

test('vertical menubar navigates with ArrowDown and a disabled menubar disables its triggers', async ({ page }) => {
  await page.goto(story('vertical'))
  await trigger(page, 'Account').focus()
  await page.keyboard.press('ArrowDown')
  await expect(trigger(page, 'Workspace')).toBeFocused()

  await page.goto(story('disabled'))
  await expect(page.getByRole('menubar')).toHaveAttribute('data-disabled', '')
  await expect(trigger(page, 'File')).toBeDisabled()
})
