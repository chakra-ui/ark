import { expect, test } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-command--${name}&viewMode=story`

test('command filters items as the user types', async ({ page }) => {
  await page.goto(story('basic'))
  const input = page.getByRole('combobox')
  const options = page.getByRole('option')
  await expect(options).toHaveCount(5)
  await input.fill('open')
  await expect(options).toHaveCount(2)
  await expect(options.first()).toHaveText(/Open file/)
  await input.fill('zzz')
  await expect(options).toHaveCount(0)
  await input.fill('')
  await expect(options).toHaveCount(5)
})

test('command navigates with the keyboard while focus stays in the input', async ({ page }) => {
  await page.goto(story('basic'))
  const input = page.getByRole('combobox')
  await input.focus()
  await expect(input).toHaveAttribute('aria-expanded', 'true')

  const highlighted = page.locator('[role=option][data-highlighted]')
  await page.keyboard.press('ArrowDown')
  await expect(highlighted).toHaveText(/Open file/)
  await expect(input).toBeFocused()
  const id = await highlighted.getAttribute('id')
  await expect(input).toHaveAttribute('aria-activedescendant', id!)

  await page.keyboard.press('End')
  await expect(highlighted).toHaveText(/Open settings/)
  await page.keyboard.press('Home')
  await expect(highlighted).toHaveText(/New file/)
  await page.keyboard.press('ArrowUp')
  await expect(highlighted).toHaveText(/New file/)

  await input.fill('sav')
  await expect(highlighted).toHaveText(/Save/)
  await page.keyboard.press('Enter')
  await expect(page.locator('output')).toHaveText('Selected: save')
  await expect(input).toHaveValue('sav')
  await expect(input).toBeFocused()
})

test('command selects an item with the pointer and keeps input focus', async ({ page }) => {
  await page.goto(story('basic'))
  const input = page.getByRole('combobox')
  await input.focus()
  await page.getByRole('option', { name: /Copy path/ }).click()
  await expect(page.locator('output')).toHaveText('Selected: copy-path')
  await expect(input).toBeFocused()
})

test('command skips disabled items and hides empty groups', async ({ page }) => {
  await page.goto(story('groups'))
  const input = page.getByRole('combobox')
  await input.focus()
  const highlighted = page.locator('[role=option][data-highlighted]')
  await page.keyboard.press('Home')
  await expect(highlighted).toHaveText('Calendar')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await expect(highlighted).toHaveText('Profile')
  await expect(page.getByRole('option', { name: 'Calculator' })).toHaveAttribute('aria-disabled', 'true')

  await input.fill('bill')
  await expect(page.getByRole('group', { name: 'Suggestions' })).toBeHidden()
  await expect(page.getByRole('group', { name: 'Settings' })).toBeVisible()
  await expect(page.getByRole('option')).toHaveCount(1)
})

test('command matches item keywords', async ({ page }) => {
  await page.goto(story('keywords'))
  await page.getByRole('combobox').fill('logout')
  await expect(page.getByRole('option')).toHaveCount(1)
  await expect(page.getByRole('option')).toHaveText('Sign out')
})

test('command shows the empty state only when nothing matches', async ({ page }) => {
  await page.goto(story('empty-state'))
  const empty = page.locator('ark-command-empty')
  const input = page.getByRole('combobox')
  await expect(input).toHaveValue('xyz')
  await expect(empty).toBeVisible()
  await expect(empty).toHaveText('No results for “xyz”')
  await input.fill('an')
  await expect(empty).toBeHidden()
  await expect(page.getByRole('option')).toHaveCount(1)
  await input.fill('anx')
  await expect(empty).toBeVisible()
})

test('command renders grouped items from JSON with keywords', async ({ page }) => {
  await page.goto(story('from-json'))
  await expect(page.getByRole('group')).toHaveCount(2)
  await page.getByRole('combobox').fill('smaller')
  await expect(page.getByRole('option')).toHaveText('Zoom out')
  await expect(page.getByRole('group', { name: 'File' })).toBeHidden()
})

test('command loads items asynchronously', async ({ page }) => {
  await page.goto(story('async'))
  await expect(page.getByRole('option')).toHaveCount(6)
  await page.getByRole('combobox').fill('grace')
  await expect(page.getByRole('option')).toHaveCount(1)
  await expect(page.getByRole('option')).toHaveText('Grace Hopper')
  await expect(page.locator('ark-command')).not.toHaveAttribute('loading')
})

test('command opens item pages and goes back with Backspace', async ({ page }) => {
  await page.goto(story('pages'))
  const input = page.getByRole('combobox')
  const options = page.getByRole('option')
  await expect(options).toHaveCount(3)
  await input.fill('theme')
  await expect(page.locator('[role=option][data-highlighted]')).toHaveText('Change theme')
  await page.keyboard.press('Enter')
  await expect(options).toHaveCount(3)
  await expect(options.first()).toHaveText('Light')
  await expect(input).toHaveValue('')
  await expect(page.locator('output')).toHaveText('Selected: none')

  await page.keyboard.press('Enter')
  await expect(page.locator('output')).toHaveText('Selected: light')

  await page.keyboard.press('Backspace')
  await expect(options).toHaveCount(3)
  await expect(page.locator('[role=option][data-highlighted]')).toHaveText('Change theme')
})

test('command palette opens with the keyboard shortcut and runs a command', async ({ page }) => {
  await page.goto(story('dialog'))
  await expect(page.locator('ark-command').evaluate((el) => !!(el as { api?: unknown }).api)).resolves.toBe(true)
  const dialog = page.getByRole('dialog', { name: 'Command palette' })
  await expect(dialog).toBeHidden()

  await page.keyboard.press('ControlOrMeta+k')
  await expect(dialog).toBeVisible()
  const input = page.getByRole('combobox')
  await expect(input).toBeFocused()

  await input.fill('term')
  await expect(page.locator('[role=option][data-highlighted]')).toHaveText(/Toggle terminal/)
  await page.keyboard.press('Enter')
  await expect(page.locator('output')).toHaveText('Ran: terminal')
  await expect(dialog).toBeHidden()

  await page.keyboard.press('ControlOrMeta+k')
  await expect(dialog).toBeVisible()
  await expect(input).toHaveValue('')
  await expect(page.getByRole('option')).toHaveCount(5)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: /Search commands/ })).toBeFocused()
})
