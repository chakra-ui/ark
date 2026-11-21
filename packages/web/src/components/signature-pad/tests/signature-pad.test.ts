import { expect, test, type Page } from '@playwright/test'
import type {} from '../index.js'

const story = (name: string) => `/iframe.html?id=components-signature-pad--${name}&viewMode=story`

async function draw(page: Page) {
  const box = (await page.locator('ark-signature-pad-control').boundingBox())!
  const x = box.x + 40
  const y = box.y + 40

  await page.mouse.move(x, y)
  await page.mouse.down()
  for (let step = 1; step <= 10; step++) {
    await page.mouse.move(x + step * 15, y + step * 4)
  }
  await page.mouse.up()
}

test('drawing creates a path and emits drawend', async ({ page }) => {
  await page.goto(story('basic'))
  const paths = page.locator('ark-signature-pad-segment svg path')
  await expect(paths).toHaveCount(0)
  await page.evaluate(() => {
    const el = document.querySelector('ark-signature-pad')!
    el.addEventListener('drawend', (event) => el.setAttribute('data-last', String(event.detail.paths.length)))
  })
  await draw(page)
  await expect(paths).toHaveCount(1)
  await expect(paths.first()).toHaveAttribute('d', /^M/)
  await expect(page.locator('ark-signature-pad')).toHaveAttribute('data-last', '1')
})

test('clear trigger removes the paths', async ({ page }) => {
  await page.goto(story('basic'))
  const paths = page.locator('ark-signature-pad-segment svg path')
  const clear = page.getByRole('button', { name: 'clear signature' })
  await expect(clear).toBeHidden()
  await draw(page)
  await expect(paths).toHaveCount(1)
  await clear.click()
  await expect(paths).toHaveCount(0)
  await expect(clear).toBeHidden()
})

test('hidden input holds the signature data url', async ({ page }) => {
  await page.goto(story('basic'))
  const input = page.locator('ark-signature-pad-hidden-input input')
  await expect(input).toHaveAttribute('name', 'signature')
  await expect(input).toHaveValue('')
  await draw(page)
  await expect(input).toHaveValue(/^data:image\/png;base64,/)
})
