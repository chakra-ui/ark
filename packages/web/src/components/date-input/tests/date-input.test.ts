import { expect, test } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-date-input--${name}&viewMode=story`

test('date input fills segments from typed digits and emits valuechange', async ({ page }) => {
  await page.goto(story('basic'))
  const dateInput = page.locator('ark-date-input')
  await dateInput.evaluate((el) => {
    const changes: unknown[] = []
    ;(window as unknown as { changes: unknown[] }).changes = changes
    el.addEventListener('valuechange', (event) => {
      const { value, source } = (event as CustomEvent).detail
      changes.push({ value: value.map(String), source })
    })
  })

  const segments = page.locator('[role=spinbutton]')
  await expect(segments).toHaveCount(3)
  await segments.first().click()
  await page.keyboard.type('06152024')

  await expect(segments.nth(0)).toHaveAttribute('aria-valuenow', '6')
  await expect(segments.nth(1)).toHaveAttribute('aria-valuenow', '15')
  await expect(segments.nth(2)).toHaveAttribute('aria-valuenow', '2024')
  await expect
    .poll(() => page.evaluate(() => (window as unknown as { changes: unknown[] }).changes.at(-1)))
    .toEqual({ value: ['2024-06-15'], source: 'keyboard' })
  await expect
    .poll(() => dateInput.evaluate((el) => (el as HTMLElement & { value: string[] }).value))
    .toEqual(['2024-06-15'])
})

test('date input moves between segments and increments with arrow keys', async ({ page }) => {
  await page.goto(story('default-value'))
  const segments = page.locator('[role=spinbutton]')
  const hiddenInput = page.locator('ark-date-input-hidden-input input')
  await expect(hiddenInput).toHaveValue('6/15/2024')

  await segments.first().focus()
  await page.keyboard.press('ArrowUp')
  await expect(segments.nth(0)).toHaveAttribute('aria-valuenow', '7')

  await page.keyboard.press('ArrowRight')
  await expect(segments.nth(1)).toBeFocused()
  await page.keyboard.press('ArrowUp')
  await expect(segments.nth(1)).toHaveAttribute('aria-valuenow', '16')
  await expect(hiddenInput).toHaveValue('7/16/2024')

  await page.keyboard.press('ArrowLeft')
  await expect(segments.nth(0)).toBeFocused()
})

test('date input clear trigger empties the value', async ({ page }) => {
  await page.goto(story('with-clear-button'))
  const segments = page.locator('[role=spinbutton]')
  const hiddenInput = page.locator('ark-date-input-hidden-input input')

  await segments.first().click()
  await page.keyboard.type('06152024')
  await expect(hiddenInput).toHaveValue('6/15/2024')

  await page.getByRole('button', { name: 'Clear date' }).click()
  await expect(hiddenInput).toHaveValue('')
  for (const segment of await segments.all()) await expect(segment).toHaveAttribute('data-placeholder-shown', '')
  await expect(segments.first()).toBeFocused()
})

test('date input submits its value through the hidden input', async ({ page }) => {
  await page.goto(story('basic'))
  await page.evaluate(() => {
    const form = document.createElement('form')
    form.innerHTML = /* html */ `
    <ark-date-input name="date" default-value="2024-06-15">
      <ark-date-input-control>
        <ark-date-input-segment-group></ark-date-input-segment-group>
      </ark-date-input-control>
      <ark-date-input-hidden-input></ark-date-input-hidden-input>
    </ark-date-input>`
    document.body.append(form)
  })

  await expect(page.locator('form ark-date-input-segment[role=spinbutton]')).toHaveCount(3)
  await expect
    .poll(() => page.locator('form').evaluate((form) => new FormData(form as HTMLFormElement).get('date')))
    .toBe('6/15/2024')
})
