import { expect, test } from '@playwright/test'
import { gotoStory, testA11yWithAttachedResults } from '../utils'

test.describe('basic variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('accordion', 'basic', page)
    await page.getByRole('button', { name: 'What is React?' }).waitFor()
  })
  test('has first item content about React open', async ({ page }) => {
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'accordion')
    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('toggles content when clicking on another accordion item', async ({ page }) => {
    await page.getByRole('button', { name: 'What is Vue?' }).click()
    expect(page.getByRole('button', { name: 'What is React?' })).toHaveAttribute(
      'data-state',
      'closed',
    )
    expect(page.getByRole('button', { name: 'What is Vue?' })).toHaveAttribute(
      'data-state',
      'open',
    )
    expect(page.getByText('React is a JavaScript library for building user interfaces.')).not.toBeVisible()
    expect(page.getByText('Vue is a JavaScript library for building user interfaces.')).toBeVisible()
    expect(page).toHaveScreenshot()
  })
})