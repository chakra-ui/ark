import { screen, waitFor } from '@testing-library/dom'
import { parse as parseDate } from '@zag-js/date-picker'

import '@ark-ui/web/date-picker'
import '@ark-ui/web/pagination'

test('a function property keeps working through connection, replacement, reconnection and clearing', async () => {
  const picker = document.createElement('ark-date-picker')
  const christmas = parseDate('2026-12-25')
  const isUnavailable = () => picker.api!.getDayTableCellState({ value: christmas }).unavailable

  picker.isDateUnavailable = (date) => date.day === 25

  expect(Object.hasOwn(picker, 'isDateUnavailable')).toBe(false)
  expect(picker.isDateUnavailable).toBeTypeOf('function')

  document.body.append(picker)
  await picker.ready

  expect(isUnavailable()).toBe(true)

  picker.isDateUnavailable = () => false

  expect(isUnavailable()).toBe(false)

  picker.remove()
  picker.isDateUnavailable = () => true
  document.body.append(picker)
  await picker.ready

  expect(isUnavailable()).toBe(true)

  picker.isDateUnavailable = undefined

  expect(isUnavailable()).toBe(false)
})

test('a new formatter updates the DOM while setting the same one again does not re-render', async () => {
  document.body.innerHTML = /* html */ `
    <ark-pagination count="100" page-size="10" type="link">
      <ark-pagination-item value="2"><a>Page 2</a></ark-pagination-item>
    </ark-pagination>`
  const pagination = document.querySelector('ark-pagination')!
  pagination.getPageUrl = ({ page }) => `/page/${page}`
  await waitFor(() => expect(screen.getByRole('link')).toHaveAttribute('href', '/page/2'))
  const render = vi.spyOn(pagination, 'render')
  const formatter = pagination.getPageUrl

  pagination.getPageUrl = formatter

  expect(render).not.toHaveBeenCalled()

  pagination.getPageUrl = ({ page }) => `/new/${page}`

  expect(render).toHaveBeenCalled()

  pagination.getPageUrl = undefined

  expect(pagination.getPageUrl).toBeUndefined()
})
