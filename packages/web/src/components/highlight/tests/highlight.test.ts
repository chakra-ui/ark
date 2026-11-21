import { expect, test } from '@playwright/test'
import type {} from '../index.js'

const story = (name: string) => `/iframe.html?id=components-highlight--${name}&viewMode=story`

test('wraps the first match in a mark', async ({ page }) => {
  await page.goto(story('basic'))

  const marks = page.locator('ark-highlight mark')
  await expect(marks).toHaveText(['component'])
  await expect(page.locator('ark-highlight')).toHaveText(
    'Ark UI is a headless component library for building accessible web applications.',
  )
})

test('match-all and exact-match change which words are marked', async ({ page }) => {
  await page.goto(story('exact-match'))

  const [partial, exact] = await page.locator('ark-highlight').all()
  await expect(partial.locator('mark')).toHaveCount(3)
  await expect(exact.locator('mark')).toHaveCount(1)
})

test('the query property accepts an array and re-renders', async ({ page }) => {
  await page.goto(story('multiple'))

  const highlight = page.locator('ark-highlight')
  await expect(highlight.locator('mark')).toHaveText(['React', 'Vue'])

  await highlight.evaluate((el: HTMLElementTagNameMap['ark-highlight']) => (el.query = 'Svelte'))
  await expect(highlight.locator('mark')).toHaveText(['Svelte'])
})

test('typing updates the query', async ({ page }) => {
  await page.goto(story('dynamic-query'))

  await page.getByPlaceholder('Search text...').fill('accessible')
  await expect(page.locator('ark-highlight mark')).toHaveText(['accessible'])
})
