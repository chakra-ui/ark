import { expect, test } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-clipboard--${name}&viewMode=story`

test.beforeEach(async ({ context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
})

test('clipboard copies the value and switches the indicator', async ({ page }) => {
  await page.goto(story('basic'))
  const root = page.locator('ark-clipboard')
  const trigger = page.getByRole('button', { name: 'Copy to clipboard' })
  await expect(page.locator('ark-clipboard-input input')).toHaveValue('https://ark-ui.com')
  await expect(page.locator('ark-clipboard-indicator[copied]')).toBeHidden()

  await trigger.click()
  await expect(root).toHaveAttribute('data-copied', '')
  await expect(page.getByRole('button', { name: 'Copied to clipboard' })).toBeVisible()
  await expect(page.locator('ark-clipboard-indicator[copied]')).toBeVisible()
  await expect(page.locator('ark-clipboard-indicator:not([copied])')).toBeHidden()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('https://ark-ui.com')
})

test('clipboard emits statuschange and renders its value text', async ({ page }) => {
  await page.goto(story('copy-status'))
  await expect(page.locator('ark-clipboard-value-text')).toHaveText('https://ark-ui.com')
  await page.getByRole('button').click()
  await expect(page.locator('output')).toHaveText('1')
})

test('clipboard resets after its timeout', async ({ page }) => {
  await page.clock.install()
  await page.goto(story('timeout'))
  const root = page.locator('ark-clipboard')
  await page.getByRole('button').click()
  await expect(root).toHaveAttribute('data-copied', '')
  await page.clock.runFor(4000)
  await expect(root).toHaveAttribute('data-copied', '')
  await page.clock.runFor(1100)
  await expect(root).not.toHaveAttribute('data-copied')
  await expect(page.locator('ark-clipboard-indicator:not([copied])')).toBeVisible()
})

test('controlled clipboard syncs the input with the value attribute', async ({ page }) => {
  await page.goto(story('controlled'))
  const input = page.locator('ark-clipboard-input input')
  await expect(input).toHaveValue('https://ark-ui.com')
  await page.getByRole('button', { name: 'Change Url' }).click()
  await expect(input).toHaveValue('https://chakra-ui.com')
  await page.getByRole('button', { name: 'Copy to clipboard' }).click()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('https://chakra-ui.com')
})
