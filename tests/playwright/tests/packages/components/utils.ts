import AxeBuilder from '@axe-core/playwright'
import type { Page, TestInfo } from '@playwright/test'

export type PackageName = 'react' | 'vue'

export const gotoStory = async (storyId: string, variantId: string, page: Page, packageName: PackageName) => {
  if (!storyId || !variantId || !packageName) await page.goto('/')

  // example urls:
  // Vue: http://localhost:6007/iframe.html?globals=&id=components-avatar--basic&viewMode=story
  // React: http://localhost:6007/iframe.html?args=&globals=&id=components-avatar--basic&viewMode=story
  switch (packageName) {
    case 'react':
      await page.goto(`http://localhost:6006/iframe.html?id=components-${storyId}--${variantId}&viewMode=story`)
      break
    case 'vue':
      await page.goto(`http://localhost:6009/iframe.html?id=components-${storyId}--${variantId}&viewMode=story`)
      break
    default:
      await page.goto('/')
      break
  }
}

export const testA11yWithAttachedResults = async (page: Page, testInfo: TestInfo, componentName: string) => {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .include(`[data-scope="${componentName}"][data-part="root"]`)
    .disableRules('color-contrast') // This rule is not relevant since Ark components are not styled by default.
    .analyze()

  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(accessibilityScanResults, null, 2),
    contentType: 'application/json',
  })
  return accessibilityScanResults
}
