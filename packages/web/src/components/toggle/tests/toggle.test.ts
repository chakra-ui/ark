import { expect, test } from '@playwright/test'
import type {} from '../index.js'

const story = (name: string) => `/iframe.html?id=components-toggle--${name}&viewMode=story`

test('toggle flips aria-pressed and emits pressedchange on click', async ({ page }) => {
  await page.goto(story('basic'))
  const button = page.getByRole('button', { name: 'Bold' })
  await expect(button).toHaveAttribute('aria-pressed', 'false')
  await page.evaluate(() => {
    const el = document.querySelector('ark-toggle')!
    el.addEventListener('pressedchange', (event) => el.setAttribute('data-last', String(event.detail.pressed)))
  })
  await button.click()
  await expect(button).toHaveAttribute('aria-pressed', 'true')
  await expect(button).toHaveAttribute('data-pressed', '')
  await expect(page.locator('ark-toggle')).toHaveAttribute('data-last', 'true')
  await button.click()
  await expect(button).toHaveAttribute('aria-pressed', 'false')
  await expect(page.locator('ark-toggle')).toHaveAttribute('data-last', 'false')
})

test('controlled toggle waits for the pressed attribute', async ({ page }) => {
  await page.goto(story('controlled'))
  const toggle = page.locator('ark-toggle')
  const button = page.getByRole('button', { name: 'Favorite' })
  await expect(button).toHaveAttribute('aria-pressed', 'false')
  await page.evaluate(() => {
    const el = document.querySelector('ark-toggle')!
    el.addEventListener('pressedchange', (event) => event.stopImmediatePropagation(), { capture: true })
  })
  await button.click()
  await expect(button).toHaveAttribute('aria-pressed', 'false')
  await toggle.evaluate((el) => el.setAttribute('pressed', 'true'))
  await expect(button).toHaveAttribute('aria-pressed', 'true')
  await toggle.evaluate((el) => el.setAttribute('pressed', 'false'))
  await expect(button).toHaveAttribute('aria-pressed', 'false')
})

test('disabled toggle does not change', async ({ page }) => {
  await page.goto(story('disabled'))
  const button = page.getByRole('button', { name: 'Bold' })
  await expect(button).toBeDisabled()
  await expect(button).toHaveAttribute('data-disabled', '')
  await button.click({ force: true })
  await expect(button).toHaveAttribute('aria-pressed', 'false')
})

test('indicator switches between pressed content and fallback', async ({ page }) => {
  await page.goto(story('indicator'))
  const button = page.getByRole('button', { name: 'Favorite' })
  const pressed = page.locator('ark-toggle-indicator:not([fallback])')
  const fallback = page.locator('ark-toggle-indicator[fallback]')
  await expect(pressed).toBeHidden()
  await expect(fallback).toBeVisible()
  await button.click()
  await expect(pressed).toBeVisible()
  await expect(pressed).toHaveAttribute('data-pressed', '')
  await expect(fallback).toBeHidden()
})
