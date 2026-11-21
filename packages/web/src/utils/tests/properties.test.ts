import { screen, waitFor } from '@testing-library/dom'
import { parse as parseDate } from '@zag-js/date-picker'

import '@ark-ui/web/date-picker'
import '@ark-ui/web/pagination'

const nextFrame = () => new Promise(requestAnimationFrame)

test('function properties survive an upgrade, replacement, clearing and reconnect', async () => {
  const picker = document.createElement('ark-date-picker')
  picker.isDateUnavailable = (date) => date.day === 25

  const ownProperty = Object.hasOwn(picker, 'isDateUnavailable')
  const early = typeof picker.isDateUnavailable

  document.body.append(picker)
  await nextFrame()

  const date = parseDate('2026-12-25')
  const state = () => picker.api!.getDayTableCellState({ value: date }).unavailable

  const initial = state()

  picker.isDateUnavailable = () => false
  const replaced = state()

  picker.remove()
  picker.isDateUnavailable = () => true
  document.body.append(picker)
  await nextFrame()
  const reconnected = state()

  picker.isDateUnavailable = undefined
  const cleared = state()

  expect({ ownProperty, early, initial, replaced, reconnected, cleared }).toEqual({
    ownProperty: false,
    early: 'function',
    initial: true,
    replaced: false,
    reconnected: true,
    cleared: false,
  })
})

test('formatters update DOM and setting the identical function does no work', async () => {
  document.body.innerHTML = /* html */ `
    <ark-pagination count="100" page-size="10" type="link">
      <ark-pagination-item value="2"><a>Page 2</a></ark-pagination-item>
    </ark-pagination>`
  const pagination = document.querySelector('ark-pagination')!

  pagination.getPageUrl = ({ page }) => `/page/${page}`
  await waitFor(() => expect(screen.getByRole('link')).toHaveAttribute('href', '/page/2'))

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

  expect(identicalRenders).toBe(0)
  expect(replacementRenders).toBeGreaterThan(0)
  expect(pagination.getPageUrl).toBeUndefined()
})
