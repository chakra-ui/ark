import { expect, test } from '@playwright/test'
import type {} from '../index.js'

const story = (name: string) => `/iframe.html?id=components-password-input--${name}&viewMode=story`

test('password input trigger toggles the input type and emits visibilitychange', async ({ page }) => {
  await page.goto(story('basic'))
  const root = page.locator('ark-password-input')
  const input = page.locator('ark-password-input-input input')
  await expect(input).toHaveAttribute('type', 'password')
  await root.evaluate((el) => {
    el.addEventListener('visibilitychange', (event) => {
      el.setAttribute('data-last', String((event as CustomEvent<{ visible: boolean }>).detail.visible))
    })
  })

  await page.getByRole('button', { name: 'Show password' }).click()
  await expect(input).toHaveAttribute('type', 'text')
  await expect(input).toBeFocused()
  await expect(root).toHaveAttribute('data-last', 'true')

  await page.getByRole('button', { name: 'Hide password' }).click()
  await expect(input).toHaveAttribute('type', 'password')
  await expect(root).toHaveAttribute('data-last', 'false')
})

test('controlled password input waits for the visible attribute', async ({ page }) => {
  await page.goto(story('controlled-visibility'))
  const root = page.locator('ark-password-input')
  const input = page.locator('ark-password-input-input input')
  await root.evaluate((el) => {
    el.addEventListener('visibilitychange', (event) => event.stopImmediatePropagation(), { capture: true })
  })

  await page.getByRole('button', { name: 'Show password' }).click()
  await expect(input).toHaveAttribute('type', 'password')
  await root.evaluate((el) => el.setAttribute('visible', 'true'))
  await expect(input).toHaveAttribute('type', 'text')
  await root.evaluate((el) => el.setAttribute('visible', 'false'))
  await expect(input).toHaveAttribute('type', 'password')
})

test('password input indicator switches with the visible state', async ({ page }) => {
  await page.goto(story('basic'))
  const shown = page.locator('ark-password-input-indicator:not([fallback])')
  const fallback = page.locator('ark-password-input-indicator[fallback]')
  await expect(shown).toBeHidden()
  await expect(fallback).toBeVisible()
  await expect(fallback).toHaveAttribute('data-state', 'hidden')

  await page.getByRole('button', { name: 'Show password' }).click()
  await expect(shown).toBeVisible()
  await expect(shown).toHaveAttribute('data-state', 'visible')
  await expect(fallback).toBeHidden()
})

test('password input submits its value under the root name', async ({ page }) => {
  await page.goto(story('basic'))
  const root = page.locator('ark-password-input')
  await root.evaluate((el) => {
    const form = document.createElement('form')
    el.before(form)
    form.append(el)
    el.setAttribute('name', 'password')
  })
  const input = page.locator('input[name=password]')
  await expect(input).toBeAttached()
  await input.fill('hunter22')
  const values = await page.evaluate(() => Object.fromEntries(new FormData(document.querySelector('form')!)))
  expect(values).toEqual({ password: 'hunter22' })
})
