import { expect, test } from '@playwright/test'
import { type PackageName, gotoStory, testA11yWithAttachedResults } from '../../components/utils'

const packages: PackageName[] = ['react', 'vue']

for (const packageName of packages) {
  test.describe(`${packageName}: basic variant`, () => {
    test.beforeEach(async ({ page }) => {
      await gotoStory('avatar', 'basic', page, packageName)
      await page.getByAltText('avatar').waitFor()
    })
    test('has avatar image', async ({ page }) => {
      await expect(page.getByAltText('avatar')).toHaveAttribute(
        'src',
        'https://i.pravatar.cc/300?u=a042581f4e29026704d',
      )
      await expect(page.locator('#storybook-root')).toHaveScreenshot()
    })
    test('has no a11y violations', async ({ page }, testInfo) => {
      const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'avatar')
      await expect(accessibilityScanResults.violations).toEqual([])
    })
  })

  test.describe(`${packageName}: root-provider variant`, () => {
    test.beforeEach(async ({ page }) => {
      await gotoStory('avatar', 'root-provider', page, packageName)
      await page.getByAltText('avatar').waitFor()
    })
    test('has avatar image', async ({ page }) => {
      await expect(page.getByAltText('avatar')).toHaveAttribute(
        'src',
        'https://i.pravatar.cc/300?u=a042581f4e29026704d',
      )
      await expect(page.locator('#storybook-root')).toHaveScreenshot()
    })
    test('has no a11y violations', async ({ page }, testInfo) => {
      const accessibilityScanResults = await testA11yWithAttachedResults(page, testInfo, 'avatar')
      await expect(accessibilityScanResults.violations).toEqual([])
    })
    test('changes avatar source when out of component button is clicked', async ({ page }) => {
      await expect(page.getByAltText('avatar')).toHaveAttribute(
        'src',
        'https://i.pravatar.cc/300?u=a042581f4e29026704d',
      )
      await page.getByRole('button', { name: 'Change Source' }).click()
      await expect(page.getByAltText('avatar')).toHaveAttribute(
        'src',
        'https://avatars.githubusercontent.com/u/6916170?v=4',
      )
      await expect(page.locator('#storybook-root')).toHaveScreenshot()
    })
  })
}
