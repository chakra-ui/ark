import { readdirSync, readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

// Discover the public examples so new stories are included in the smoke checks.
for (const file of readdirSync(new URL('../stories', import.meta.url))) {
  if (!file.endsWith('.stories.ts')) continue
  const component = file.replace('.stories.ts', '')
  const rootTag = component.startsWith('progress-')
    ? 'ark-progress'
    : component === 'toast'
      ? 'ark-toaster'
      : `ark-${component}`
  const source = readFileSync(new URL(`../stories/${file}`, import.meta.url), 'utf8')
  const names = [...source.matchAll(/export const (\w+)/g)].map((match) => match[1])
  for (const name of names) {
    const example = name
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase()
    test(`${component}: ${example} renders`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto(`/iframe.html?id=components-${component}--${example}&viewMode=story`)
      await expect(page.locator('#storybook-root').locator(rootTag).first()).toBeAttached()
      await expect
        .poll(() =>
          page
            .locator('#storybook-root')
            .locator(rootTag)
            .first()
            .evaluate((el) => !!(el as HTMLElement & { api?: unknown }).api),
        )
        .toBe(true)
      await page.evaluate(
        () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))),
      )
      expect(errors).toEqual([])
      await expect(page.locator('.sb-errordisplay')).not.toBeVisible()
    })
  }
}
