import { expect, test } from '@playwright/test'

test('has avatar image', async ({ page }) => {
  // Using the sandbox to isolate the story from the rest of Histoire.
  await page.goto('/__sandbox.html?storyId=avatar&variantId=basic')

  await page.getByAltText('avatar').waitFor()

  expect(page.getByAltText('avatar')).toHaveAttribute('src', 'https://i.pravatar.cc/3000')
})
