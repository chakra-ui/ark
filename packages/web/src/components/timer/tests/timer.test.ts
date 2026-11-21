import { expect, type Page, test } from '@playwright/test'
import type {} from '../index.js'

const story = (name: string) => `/iframe.html?id=components-timer--${name}&viewMode=story`

const item = (page: Page, type: string) => page.locator(`ark-timer-item[type="${type}"]`)

test.beforeEach(async ({ page }) => {
  await page.clock.install()
})

test('start advances the seconds and emits tick', async ({ page }) => {
  await page.goto(story('events'))
  await expect(item(page, 'seconds')).toHaveText('00')

  await page.getByRole('button', { name: 'Start' }).click()
  await page.clock.runFor(3500)

  await expect(item(page, 'seconds')).toHaveText('03')
  await expect(page.locator('output')).toHaveText('Ticks: 3')
})

test('pause stops the timer and offers resume', async ({ page }) => {
  await page.goto(story('basic'))
  await expect(item(page, 'minutes')).toHaveText('40')

  await page.getByRole('button', { name: 'Play' }).click()
  await page.clock.runFor(2500)
  await page.getByRole('button', { name: 'Pause' }).click()
  await expect(item(page, 'seconds')).toHaveText('02')

  await page.clock.runFor(5000)
  await expect(item(page, 'seconds')).toHaveText('02')
  await expect(page.getByRole('button', { name: 'Resume' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Pause' })).toBeHidden()
})

test('countdown reaches zero and emits complete', async ({ page }) => {
  await page.goto(story('countdown'))
  await page.locator('ark-timer').waitFor({ state: 'attached' })
  await page.evaluate(() => {
    const el = document.querySelector('ark-timer')!
    el.addEventListener('complete', () => el.setAttribute('data-completed', ''))
    el.setAttribute('start-ms', '3000')
  })
  await expect(item(page, 'seconds')).toHaveText('03')

  await page.getByRole('button', { name: 'Start' }).click()
  await page.clock.runFor(4000)

  await expect(page.locator('ark-timer')).toHaveAttribute('data-completed', '')
  await expect(item(page, 'minutes')).toHaveText('00')
  await expect(item(page, 'seconds')).toHaveText('00')
  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible()
})

test('action triggers are hidden when their action is unavailable', async ({ page }) => {
  await page.goto(story('basic'))
  const play = page.locator('ark-timer-action-trigger[action="start"] button')
  const resume = page.locator('ark-timer-action-trigger[action="resume"] button')
  const pause = page.locator('ark-timer-action-trigger[action="pause"] button')

  await expect(play).toBeVisible()
  await expect(pause).toBeHidden()
  await expect(resume).toBeHidden()

  await play.click()
  await expect(play).toBeHidden()
  await expect(pause).toBeVisible()
  await expect(resume).toBeHidden()
})
