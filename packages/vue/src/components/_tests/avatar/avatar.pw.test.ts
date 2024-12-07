import { expect, test } from '@playwright/test'
import { gotoStory } from '../utils'

test.describe('basic variant', () => {
  test('has avatar image', async ({ page }) => {
    await gotoStory('avatar', 'basic', page)

    await page.getByAltText('avatar').waitFor()
    expect(page.getByAltText('avatar')).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/1846056?v=4',
    )
    expect(page).toHaveScreenshot()
  })
})

test.describe('closed variant', () => {
  test('displays avatar with name', async ({ page }) => {
    await gotoStory('avatar', 'closed', page)

    await page.getByAltText('Christian').waitFor()
    expect(page.getByAltText('Christian')).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/1846056?v=4',
    )
    expect(page).toHaveScreenshot()
  })
})

test.describe('root-provided variant', () => {
  test('has avatar image', async ({ page }) => {
    await gotoStory('avatar', 'root-provider', page)

    await page.getByAltText('avatar').waitFor()
    expect(page.getByAltText('avatar')).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/1846056?v=4',
    )
    expect(page).toHaveScreenshot()
  })
})
