import type { Page } from '@playwright/test'

export const gotoStory = async (storyId: string, variantId: string, page: Page) => {
  if (!storyId || !variantId) await page.goto('/')

  // Using the sandbox to isolate the story from the rest of Histoire.
  await page.goto(`/__sandbox.html?storyId=${storyId}&variantId=${variantId}`)
}
