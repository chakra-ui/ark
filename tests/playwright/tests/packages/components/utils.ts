import type { Page } from '@playwright/test'

export type PackageName = 'react' | 'vue' | 'solid'

export const gotoStory = async (storyId: string, variantId: string, page: Page, packageName: PackageName) => {
  if (!storyId || !variantId || !packageName) await page.goto('/')

  // example urls:
  // Vue: http://localhost:6007/iframe.html?globals=&id=components-avatar--basic&viewMode=story
  // React: http://localhost:6007/iframe.html?args=&globals=&id=components-avatar--basic&viewMode=story
  switch (packageName) {
    case 'react':
      await page.goto(`http://localhost:6006/iframe.html?id=components-${storyId}--${variantId}&viewMode=story`)
      break
    case 'solid':
      await page.goto(`http://localhost:6007/iframe.html?id=components-${storyId}--${variantId}&viewMode=story`)
      break
    case 'vue':
      await page.goto(`http://localhost:6009/iframe.html?id=components-${storyId}--${variantId}&viewMode=story`)
      break
    default:
      await page.goto('/')
      break
  }
}
