import { expect, test } from '@playwright/test'
import { type PackageName, gotoStory } from '../../components/utils'

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
  })
}
