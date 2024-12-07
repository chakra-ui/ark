import AxeBuilder from '@axe-core/playwright'
import type { Page, TestInfo } from '@playwright/test'

export const gotoStory = async (storyId: string, variantId: string, page: Page) => {
  if (!storyId || !variantId) await page.goto('/')

  // Using the sandbox to isolate the story from the rest of Histoire.
  await page.goto(`/__sandbox.html?storyId=${storyId}&variantId=${variantId}`)
}

export const testA11yWithAttachedResults = async (
  page: Page,
  testInfo: TestInfo,
  componentName: string,
) => {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .include(`[data-scope="${componentName}"][data-part="root"]`)
    .analyze()

  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(accessibilityScanResults, null, 2),
    contentType: 'application/json',
  })

  return accessibilityScanResults
}
