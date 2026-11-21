import { expect, test } from '@playwright/test'
import type { DatePickerElement } from '../../index.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
})

test('function properties survive an upgrade, replacement, clearing and reconnect', async ({ page }) => {
  await page.addInitScript(() => {
    const picker = document.createElement('ark-date-picker') as DatePickerElement
    picker.isDateUnavailable = (date) => date.day === 25
    Object.assign(window, { earlyPicker: picker })
  })
  await page.reload()
  const result = await page.evaluate(async () => {
    const picker = (window as any).earlyPicker as DatePickerElement
    customElements.upgrade(picker)
    const ownProperty = Object.hasOwn(picker, 'isDateUnavailable')
    const early = typeof picker.isDateUnavailable
    document.body.append(picker)
    await new Promise(requestAnimationFrame)
    const date = (window as any).parseDate('2026-12-25')
    const state = () => picker.api!.getDayTableCellState({ value: date }).unavailable
    const initial = state()
    picker.isDateUnavailable = () => false
    const replaced = state()
    picker.remove()
    picker.isDateUnavailable = () => true
    document.body.append(picker)
    await new Promise(requestAnimationFrame)
    const reconnected = state()
    picker.isDateUnavailable = undefined
    const cleared = state()
    return { ownProperty, early, initial, replaced, reconnected, cleared }
  })
  expect(result).toEqual({
    ownProperty: false,
    early: 'function',
    initial: true,
    replaced: false,
    reconnected: true,
    cleared: false,
  })
})

test('formatters update DOM and setting the identical function does no work', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-pagination count="100" page-size="10" type="link">
      <ark-pagination-item value="2"><a>Page 2</a></ark-pagination-item>
    </ark-pagination>`)
  await page.evaluate(() => {
    const pagination = document.querySelector('ark-pagination')!
    pagination.getPageUrl = ({ page }) => `/page/${page}`
  })
  await expect(page.getByRole('link')).toHaveAttribute('href', '/page/2')
  const result = await page.evaluate(() => {
    const pagination = document.querySelector('ark-pagination')!
    const render = pagination.render.bind(pagination)
    let renders = 0
    pagination.render = () => {
      renders++
      render()
    }
    const formatter = pagination.getPageUrl
    pagination.getPageUrl = formatter
    const identicalRenders = renders
    pagination.getPageUrl = ({ page }) => `/new/${page}`
    const replacementRenders = renders
    pagination.getPageUrl = undefined
    return { identicalRenders, replacementRenders, cleared: pagination.getPageUrl === undefined }
  })
  expect(result.identicalRenders).toBe(0)
  expect(result.replacementRenders).toBeGreaterThan(0)
  expect(result.cleared).toBe(true)
})
