import { readdirSync, readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

// Discover the public examples so new stories are included in the smoke checks.
for (const file of readdirSync(new URL('../stories', import.meta.url))) {
  if (!file.endsWith('.stories.ts')) continue
  const component = file.replace('.stories.ts', '')
  const rootTag = component.startsWith('progress-')
    ? 'ark-progress'
    : component === 'toast'
      ? 'ark-toaster'
      : `ark-${component}`
  const source = readFileSync(new URL(`../stories/${file}`, import.meta.url), 'utf8')
  const names = [...source.matchAll(/export const (\w+)/g)].map((match) => match[1])
  for (const name of names) {
    const example = name
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase()
    test(`${component}: ${example} renders`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto(`/iframe.html?id=components-${component}--${example}&viewMode=story`)
      await expect(page.locator('#storybook-root').locator(rootTag).first()).toBeAttached()
      await expect
        .poll(() =>
          page
            .locator('#storybook-root')
            .locator(rootTag)
            .first()
            .evaluate((el) => !!(el as HTMLElement & { api?: unknown }).api),
        )
        .toBe(true)
      await page.evaluate(
        () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))),
      )
      expect(errors).toEqual([])
      await expect(page.locator('.sb-errordisplay')).not.toBeVisible()
    })
  }
}

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

test('dialog supports keyboard dismissal and restores trigger focus', async ({ page }) => {
  await page.goto('/iframe.html?id=components-dialog--basic&viewMode=story')
  const trigger = page.getByRole('button', { name: 'Open Dialog', exact: true })
  await trigger.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

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
