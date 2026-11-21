import { expect, test } from '@playwright/test'
import type {} from '../index.js'

const story = (name: string) => `/iframe.html?id=components-angle-slider--${name}&viewMode=story`

test('arrow keys change the value and emit valuechange', async ({ page }) => {
  await page.goto(story('step'))
  const slider = page.locator('ark-angle-slider')
  const thumb = page.getByRole('slider', { name: '15 Step' })
  await expect(thumb).toHaveAttribute('aria-valuenow', '0')
  await page.evaluate(() => {
    const el = document.querySelector('ark-angle-slider')!
    el.addEventListener('valuechange', (event) => {
      el.setAttribute('data-last', `${event.detail.value}:${event.detail.source}`)
    })
  })
  await thumb.focus()
  await page.keyboard.press('ArrowRight')
  await expect(thumb).toHaveAttribute('aria-valuenow', '15')
  await expect(slider).toHaveAttribute('data-last', '15:keyboard')
  await page.keyboard.press('ArrowRight')
  await expect(thumb).toHaveAttribute('aria-valuenow', '30')
  await expect(page.locator('ark-angle-slider-value-text')).toHaveText('30deg')
  await page.keyboard.press('ArrowLeft')
  await expect(thumb).toHaveAttribute('aria-valuenow', '15')
  await expect(slider).toHaveAttribute('data-last', '15:keyboard')
})

test('the live value property updates the thumb without an event', async ({ page }) => {
  await page.goto(story('basic'))
  const thumb = page.getByRole('slider', { name: 'Rotation' })
  await expect(thumb).toHaveAttribute('aria-valuenow', '0')
  const value = await page.evaluate(async () => {
    const el = document.querySelector('ark-angle-slider')!
    el.addEventListener('valuechange', () => el.setAttribute('data-changed', ''))
    el.value = 90
    return el.value
  })
  expect(value).toBe(90)
  await expect(thumb).toHaveAttribute('aria-valuenow', '90')
  await expect(page.locator('ark-angle-slider-value-text')).toHaveText('90deg')
  await expect(page.locator('ark-angle-slider-marker[value="90"]')).toHaveAttribute('data-state', 'at-value')
  await expect(page.locator('ark-angle-slider')).not.toHaveAttribute('data-changed')
})

test('the hidden input carries the value for forms', async ({ page }) => {
  await page.goto(story('basic'))
  await page.evaluate(() => {
    const form = document.createElement('form')
    form.innerHTML = /* html */ `
    <ark-angle-slider name="rotation" default-value="30" step="10">
      <ark-angle-slider-label>Form rotation</ark-angle-slider-label>
      <ark-angle-slider-control><ark-angle-slider-thumb></ark-angle-slider-thumb></ark-angle-slider-control>
      <ark-angle-slider-hidden-input></ark-angle-slider-hidden-input>
    </ark-angle-slider>`
    document.body.append(form)
  })
  const formValue = () => page.evaluate(() => new FormData(document.querySelector('form')!).get('rotation'))
  await expect.poll(formValue).toBe('30')
  await page.getByRole('slider', { name: 'Form rotation' }).focus()
  await page.keyboard.press('ArrowRight')
  await expect.poll(formValue).toBe('40')
})
