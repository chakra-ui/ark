import { expect, test } from '@playwright/test'
import { gotoStory, testA11yWithAttachedResults } from '../utils'

test.describe('basic variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('avatar', 'basic', page)
    await page.getByAltText('avatar').waitFor()
  })
  test('has avatar image', async ({ page }) => {
    expect(page.getByAltText('avatar')).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/1846056?v=4',
    )
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'avatar')
    expect(accessibilityScanResults.violations).toEqual([])
  })
})

test.describe('closed variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('avatar', 'closed', page)
    await page.getByAltText('Christian').waitFor()
  })
  test('displays avatar with name', async ({ page }) => {
    expect(page.getByAltText('Christian')).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/1846056?v=4',
    )
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'avatar')
    expect(accessibilityScanResults.violations).toEqual([])
  })
})

test.describe('root-provided variant', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory('avatar', 'root-provider', page)
    await page.getByAltText('avatar').waitFor()
  })
  test('has avatar image', async ({ page }) => {
    expect(page.getByAltText('avatar')).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/1846056?v=4',
    )
    expect(page).toHaveScreenshot()
  })
  test('has no a11y violations', async ({ page }, testInfo) => {
    const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'avatar')
    expect(accessibilityScanResults.violations).toEqual([])
  })
})
