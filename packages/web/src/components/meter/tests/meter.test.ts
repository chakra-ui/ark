import { expect, test } from '@playwright/test'
import type {} from '../index.js'

const story = (name: string) => `/iframe.html?id=components-meter--${name}&viewMode=story`

test('meter exposes role and aria values', async ({ page }) => {
  await page.goto(story('basic'))
  const meter = page.getByRole('meter', { name: 'Storage used' })
  await expect(meter).toHaveAttribute('aria-valuenow', '24')
  await expect(meter).toHaveAttribute('aria-valuemin', '0')
  await expect(meter).toHaveAttribute('aria-valuemax', '100')
  await expect(meter).toHaveAttribute('aria-valuetext', '24%')
})

test('changing the value attribute updates the range and value text', async ({ page }) => {
  await page.goto(story('basic'))
  const meter = page.locator('ark-meter')
  const range = page.locator('ark-meter-range')
  const valueText = page.locator('ark-meter-value-text')
  await expect(valueText).toHaveText('24%')
  await meter.evaluate((el) => el.setAttribute('value', '60'))
  await expect(meter).toHaveAttribute('aria-valuenow', '60')
  await expect.poll(() => meter.evaluate((el) => el.style.getPropertyValue('--percent'))).toBe('60')
  await expect(range).toHaveAttribute('style', /width: 60%/)
  await expect(valueText).toHaveText('60%')
})

test('low, high and optimum set the value state', async ({ page }) => {
  await page.goto(story('value-state'))
  const meters = page.locator('ark-meter')
  await expect(meters.nth(0)).toHaveAttribute('data-state', 'optimal')
  await expect(meters.nth(1)).toHaveAttribute('data-state', 'suboptimal')
  await expect(meters.nth(2)).toHaveAttribute('data-state', 'least-optimal')
  await expect(meters.nth(2).locator('ark-meter-range')).toHaveAttribute('data-state', 'least-optimal')
  await meters.nth(0).evaluate((el) => el.setAttribute('value', '95'))
  await expect(meters.nth(0)).toHaveAttribute('data-state', 'least-optimal')
})
