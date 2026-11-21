import { expect, test } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-scroll-area--${name}&viewMode=story`

const thumbOffset = (transform: string) => {
  const match = /translate3d\(([-\d.]+)px,\s*([-\d.]+)px/.exec(transform)
  return match ? { x: Number(match[1]), y: Number(match[2]) } : { x: 0, y: 0 }
}

test('scroll area marks overflow on the axes that scroll', async ({ page }) => {
  await page.goto(story('basic'))
  const vertical = page.locator('ark-scroll-area-scrollbar').first()
  await expect(vertical).toHaveAttribute('data-orientation', 'vertical')
  await expect(vertical).toHaveAttribute('data-overflow-y', '')
  await expect(vertical).not.toHaveAttribute('data-overflow-x', '')
  await expect(page.locator('ark-scroll-area-thumb')).toHaveAttribute('data-orientation', 'vertical')
  await expect(page.locator('ark-scroll-area-viewport')).toHaveAttribute('tabindex', '0')

  await page.goto(story('horizontal'))
  const horizontal = page.locator('ark-scroll-area-scrollbar')
  await expect(horizontal).toHaveAttribute('data-overflow-x', '')
  await expect(horizontal).not.toHaveAttribute('data-overflow-y', '')
  await expect(page.locator('ark-scroll-area-thumb')).toHaveAttribute('data-orientation', 'horizontal')
})

test('scrolling the viewport sizes and moves the thumb', async ({ page }) => {
  await page.goto(story('basic'))
  const root = page.locator('ark-scroll-area')
  const viewport = page.locator('ark-scroll-area-viewport')
  const thumb = page.locator('ark-scroll-area-thumb')
  await expect
    .poll(() => root.evaluate((el) => parseFloat(el.style.getPropertyValue('--thumb-height'))))
    .toBeGreaterThan(0)
  await expect(viewport).toHaveAttribute('data-at-top', '')

  await viewport.evaluate((el) => el.scrollTo({ top: el.scrollHeight }))
  await expect(viewport).toHaveAttribute('data-at-bottom', '')
  await expect(viewport).not.toHaveAttribute('data-at-top', '')
  await expect.poll(async () => thumbOffset(await thumb.evaluate((el) => el.style.transform)).y).toBeGreaterThan(0)
})

test('dragging the thumb scrolls the viewport', async ({ page }) => {
  await page.goto(story('basic'))
  const root = page.locator('ark-scroll-area')
  const viewport = page.locator('ark-scroll-area-viewport')
  const scrollbar = page.locator('ark-scroll-area-scrollbar')
  const thumb = page.locator('ark-scroll-area-thumb')
  await expect
    .poll(() => root.evaluate((el) => parseFloat(el.style.getPropertyValue('--thumb-height'))))
    .toBeGreaterThan(0)

  await root.hover()
  await expect(scrollbar).toHaveAttribute('data-hover', '')
  const box = (await thumb.boundingBox())!
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  await expect(scrollbar).toHaveAttribute('data-dragging', '')
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 30, { steps: 5 })
  await page.mouse.up()
  await expect.poll(() => viewport.evaluate((el) => el.scrollTop)).toBeGreaterThan(0)
  await expect(scrollbar).not.toHaveAttribute('data-dragging', '')
})

test('nested scroll areas track their own scroll state', async ({ page }) => {
  await page.goto(story('nested'))
  const outer = page.locator('ark-scroll-area-viewport').first()
  const inner = page.locator('ark-scroll-area ark-scroll-area ark-scroll-area-viewport')
  await inner.evaluate((el) => el.scrollTo({ top: el.scrollHeight }))
  await expect(inner).toHaveAttribute('data-at-bottom', '')
  await expect(outer).toHaveAttribute('data-at-top', '')
  await expect(outer).not.toHaveAttribute('data-at-bottom', '')
})
