import { expect, test } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-qr-code--${name}&viewMode=story`

test('qr code renders the pattern path inside the frame svg', async ({ page }) => {
  await page.goto(story('basic'))
  const svg = page.locator('ark-qr-code-frame > svg')
  await expect(svg).toHaveAttribute('data-qr-code-frame')
  await expect(svg).toHaveAttribute('viewBox', /^0 0 \d+ \d+$/)
  const path = svg.locator('path[data-qr-code-pattern]')
  await expect(path).toHaveCount(1)
  await expect(path).toHaveAttribute('d', /^M/)
})

test('qr code re-encodes when the value attribute or property changes', async ({ page }) => {
  await page.goto(story('basic'))
  const qrCode = page.locator('ark-qr-code')
  const path = page.locator('path[data-qr-code-pattern]')
  await expect(path).toHaveAttribute('d', /^M/)
  const initial = await path.getAttribute('d')

  await qrCode.evaluate((el) => el.setAttribute('value', 'https://chakra-ui.com'))
  await expect(path).not.toHaveAttribute('d', initial!)
  const controlled = await path.getAttribute('d')

  await qrCode.evaluate((el) => el.removeAttribute('value'))
  await qrCode.evaluate((el: HTMLElementTagNameMap['ark-qr-code']) => (el.value = 'https://zagjs.com'))
  await expect
    .poll(() => qrCode.evaluate((el: HTMLElementTagNameMap['ark-qr-code']) => el.value))
    .toBe('https://zagjs.com')
  await expect(path).not.toHaveAttribute('d', controlled!)
})

test('qr code download trigger downloads an image', async ({ page }) => {
  await page.goto(story('download'))
  await expect(page.locator('path[data-qr-code-pattern]')).toHaveAttribute('d', /^M/)
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download' }).click(),
  ])
  expect(download.suggestedFilename()).toBe('qr-code.png')
})
