import { expect, test, type Page, type Route } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-avatar--${name}&viewMode=story`

const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" /></svg>'

const fulfill = (route: Route) => route.fulfill({ status: 200, contentType: 'image/svg+xml', body: svg })

async function holdImages(page: Page) {
  const pending: Route[] = []
  await page.route('https://i.pravatar.cc/**', (route) => {
    pending.push(route)
  })
  return async () => {
    await expect.poll(() => pending.length).toBeGreaterThan(0)
    for (const route of pending.splice(0)) await fulfill(route)
  }
}

test('avatar shows the fallback until the image loads', async ({ page }) => {
  const release = await holdImages(page)
  await page.goto(story('basic'))
  const avatar = page.locator('ark-avatar')
  const image = page.locator('img')
  await expect(avatar).toHaveAttribute('data-status', 'loading')
  await expect(page.getByText('PA', { exact: true })).toBeVisible()
  await expect(image).toBeHidden()

  await release()
  await expect(avatar).toHaveAttribute('data-status', 'loaded')
  await expect(image).toBeVisible()
  await expect(image).toHaveAttribute('data-state', 'visible')
  await expect(page.getByText('PA', { exact: true })).toBeHidden()
})

test('avatar keeps the fallback when the image fails', async ({ page }) => {
  await page.route('https://i.pravatar.cc/**', (route) => route.abort())
  await page.goto(story('events'))
  await expect(page.locator('output')).toHaveText('Status: error')
  await expect(page.locator('ark-avatar')).toHaveAttribute('data-status', 'error')
  await expect(page.getByText('PA', { exact: true })).toBeVisible()
  await expect(page.locator('img')).toBeHidden()
})

test('avatar dispatches statuschange and resets when the source changes', async ({ page }) => {
  const release = await holdImages(page)
  await page.goto(story('events'))
  const output = page.locator('output')
  await expect(output).toHaveText('Status: loading')
  await release()
  await expect(output).toHaveText('Status: loaded')

  await page.locator('img').evaluate((img) => img.setAttribute('src', 'https://i.pravatar.cc/3000?u=b'))
  await expect(output).toHaveText('Status: loading')
  await expect(page.getByText('PA', { exact: true })).toBeVisible()
  await release()
  await expect(output).toHaveText('Status: loaded')
})
