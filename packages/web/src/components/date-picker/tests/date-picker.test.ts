import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Inline } from '../examples/inline.js'
import { mount as Locale } from '../examples/locale.js'
import { mount as MinMax } from '../examples/min-max.js'
import { mount as MultiSelection } from '../examples/multi-selection.js'
import { mount as RangeSelection } from '../examples/range-selection.js'
import { mount as Unavailable } from '../examples/unavailable.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

const timeZone = process.env.TZ

beforeAll(() => {
  process.env.TZ = 'UTC'
})

afterAll(() => {
  if (timeZone === undefined) delete process.env.TZ
  else process.env.TZ = timeZone
})

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2025, 2, 15, 12))
})

afterEach(() => {
  vi.useRealTimers()
})

const picker = () => document.querySelector('ark-date-picker')!

const day = (label: RegExp | string) => screen.getByRole('button', { name: label })

const input = (index = 0) => document.querySelectorAll<HTMLInputElement>('ark-date-picker-input input')[index]

const setup = async (example: (root: HTMLElement) => void) => {
  mount(example)
  await picker().ready
  return picker()
}

const open = async () => {
  await user.click(screen.getByRole('button', { name: 'Open calendar' }))
  await waitFor(() => expect(screen.getByRole('grid')).toBeVisible())
}

const lastValue = (listener: ReturnType<typeof vi.fn>) =>
  (listener.mock.lastCall?.[0] as CustomEvent<{ value: unknown[] }> | undefined)?.detail.value.map(String)

test('the trigger opens and closes the calendar', async () => {
  await setup(Basic)
  const trigger = screen.getByRole('button', { name: 'Open calendar' })
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect(document.querySelector('ark-date-picker-content')).not.toBeVisible()

  await open()

  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  expect(trigger).toHaveAccessibleName('Close calendar')
  await waitFor(() => expect(day('Choose Saturday, March 15, 2025')).toHaveFocus())
  expect(day('Choose Saturday, March 15, 2025')).toHaveAttribute('data-today', '')
  expect(screen.getByRole('button', { name: 'Switch to month view' })).toHaveTextContent('March 2025')

  await user.click(trigger)

  await waitFor(() => expect(document.querySelector('ark-date-picker-content')).not.toBeVisible())
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
})

test('Escape closes the calendar', async () => {
  await setup(Basic)
  await open()

  await user.keyboard('{Escape}')

  await waitFor(() => expect(picker().open).toBe(false))
  expect(screen.queryByRole('grid')).not.toBeInTheDocument()
})

test('clicking a day selects it, fills the input and closes the calendar', async () => {
  await setup(Basic)
  const valuechange = vi.fn()
  picker().addEventListener('valuechange', valuechange)
  await open()

  await user.click(day('Choose Thursday, March 20, 2025'))

  await waitFor(() => expect(input()).toHaveValue('03/20/2025'))
  expect(lastValue(valuechange)).toEqual(['2025-03-20'])
  expect(picker().value).toEqual(['2025-03-20'])
  await waitFor(() => expect(picker().open).toBe(false))

  await open()
  expect(day('Selected date. Thursday, March 20, 2025')).toHaveAttribute('data-selected', '')
  expect(day('Selected date. Thursday, March 20, 2025').closest('[role="gridcell"]')).toHaveAttribute(
    'aria-selected',
    'true',
  )
})

test('arrow keys, Page Up/Down, Home and End move focus through the grid and Enter selects', async () => {
  await setup(Basic)
  await open()
  await waitFor(() => expect(day(/March 15, 2025/)).toHaveFocus())

  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(day(/March 16, 2025/)).toHaveFocus())

  await user.keyboard('{ArrowDown}')
  await waitFor(() => expect(day(/March 23, 2025/)).toHaveFocus())

  await user.keyboard('{ArrowLeft}{ArrowUp}')
  await waitFor(() => expect(day(/March 15, 2025/)).toHaveFocus())

  await user.keyboard('{PageDown}')
  await waitFor(() => expect(day(/April 15, 2025/)).toHaveFocus())
  expect(screen.getByRole('button', { name: 'Switch to month view' })).toHaveTextContent('April 2025')

  await user.keyboard('{PageUp}')
  await waitFor(() => expect(day(/March 15, 2025/)).toHaveFocus())

  await user.keyboard('{Home}')
  await waitFor(() => expect(day(/March 1, 2025/)).toHaveFocus())

  await user.keyboard('{End}')
  await waitFor(() => expect(day(/March 31, 2025/)).toHaveFocus())

  await user.keyboard('{Enter}')

  await waitFor(() => expect(input()).toHaveValue('03/31/2025'))
  expect(picker().value).toEqual(['2025-03-31'])
})

test('the previous and next triggers change the visible month', async () => {
  await setup(Basic)
  await open()
  const visiblerangechange = vi.fn()
  picker().addEventListener('visiblerangechange', visiblerangechange)

  await user.click(screen.getByRole('button', { name: 'Switch to next month' }))

  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'Switch to month view' })).toHaveTextContent('April 2025'),
  )
  expect(visiblerangechange).toHaveBeenCalled()

  await user.click(screen.getByRole('button', { name: 'Switch to previous month' }))
  await user.click(screen.getByRole('button', { name: 'Switch to previous month' }))

  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'Switch to month view' })).toHaveTextContent('February 2025'),
  )
})

test('typing a date in the input selects it', async () => {
  await setup(Basic)
  const valuechange = vi.fn()
  picker().addEventListener('valuechange', valuechange)

  await user.type(input(), '04/02/2025{Enter}')

  await waitFor(() => expect(lastValue(valuechange)).toEqual(['2025-04-02']))
  expect(picker().value).toEqual(['2025-04-02'])

  await user.click(screen.getByRole('button', { name: 'Open calendar' }))
  await waitFor(() => expect(day('Selected date. Wednesday, April 2, 2025')).toHaveFocus())
})

test('the clear trigger empties the value', async () => {
  await setup(Basic)
  await open()
  await user.click(day(/March 20, 2025/))
  await waitFor(() => expect(input()).toHaveValue('03/20/2025'))

  await user.click(screen.getByRole('button', { name: 'Clear selected dates' }))

  await waitFor(() => expect(input()).toHaveValue(''))
  expect(picker().value).toEqual([])
})

test('days outside min and max are disabled and cannot be selected', async () => {
  await setup(MinMax)
  await open()

  const before = day(/March 4, 2025/)
  expect(before).toHaveAttribute('aria-disabled', 'true')
  expect(day(/March 5, 2025/)).not.toHaveAttribute('aria-disabled')
  expect(day(/March 31, 2025/)).not.toHaveAttribute('aria-disabled')
  expect(screen.getByRole('button', { name: 'Switch to next month' })).toBeDisabled()

  await user.click(before)
  await settle()

  expect(picker().value).toEqual([])
  expect(picker().open).toBe(true)
})

test('unavailable days are marked and cannot be selected', async () => {
  await setup(Unavailable)
  await open()

  const weekend = day('Not available. Saturday, March 22, 2025')
  expect(weekend).toHaveAttribute('data-unavailable', '')
  expect(weekend).toHaveAttribute('aria-disabled', 'true')
  expect(day('Choose Friday, March 21, 2025')).not.toHaveAttribute('data-unavailable')

  await user.click(weekend)
  await settle()

  expect(picker().value).toEqual([])
})

test('range selection picks a start and end and marks the days between', async () => {
  await setup(RangeSelection)
  const valuechange = vi.fn()
  picker().addEventListener('valuechange', valuechange)
  await open()

  await user.click(day(/March 10, 2025/))
  await user.click(day(/March 14, 2025/))

  await waitFor(() => expect(lastValue(valuechange)).toEqual(['2025-03-10', '2025-03-14']))
  expect(input(0)).toHaveValue('03/10/2025')
  expect(input(1)).toHaveValue('03/14/2025')

  await open()
  expect(day('Starting range from Monday, March 10, 2025')).toHaveAttribute('data-range-start', '')
  expect(day('In range. Wednesday, March 12, 2025')).toHaveAttribute('data-in-range', '')
  expect(day('Range ending at Friday, March 14, 2025')).toHaveAttribute('data-range-end', '')
  expect(day(/March 15, 2025/)).not.toHaveAttribute('data-in-range')
})

test('a range preset selects the last seven days', async () => {
  await setup(RangeSelection)

  const preset = screen.getByText('Last 7 days')
  expect(preset).toHaveAccessibleName('select Sun Mar 09 2025 to Sat Mar 15 2025')

  await user.click(preset)

  await waitFor(() => expect(picker().value).toEqual(['2025-03-09', '2025-03-15']))
})

test('multiple selection toggles each clicked day and keeps the calendar open', async () => {
  await setup(MultiSelection)
  const valuechange = vi.fn()
  picker().addEventListener('valuechange', valuechange)
  await open()

  await user.click(day(/March 3, 2025/))
  await user.click(day(/March 7, 2025/))
  await user.click(day(/March 12, 2025/))

  await waitFor(() => expect(lastValue(valuechange)).toEqual(['2025-03-03', '2025-03-07', '2025-03-12']))
  expect(picker().open).toBe(true)
  expect(day(/March 7, 2025/)).toHaveAttribute('data-selected', '')

  await user.click(day(/March 7, 2025/))

  await waitFor(() => expect(picker().value).toEqual(['2025-03-03', '2025-03-12']))
  expect(day(/March 7, 2025/)).not.toHaveAttribute('data-selected')
})

test('the view trigger switches from days to months to years and picking drills back down', async () => {
  await setup(Basic)
  const viewchange = vi.fn()
  picker().addEventListener('viewchange', viewchange)
  await open()

  await user.click(screen.getByRole('button', { name: 'Switch to month view' }))

  await waitFor(() => expect(picker().view).toBe('month'))
  expect(viewchange.mock.lastCall?.[0].detail.view).toBe('month')
  const months = document.querySelector<HTMLElement>('ark-date-picker-view[view="month"]')!
  expect(months).toBeVisible()
  expect(document.querySelector('ark-date-picker-view[view="day"]')).not.toBeVisible()

  await user.click(within(months).getByRole('button', { name: 'Switch to year view' }))

  await waitFor(() => expect(picker().view).toBe('year'))
  const years = document.querySelector<HTMLElement>('ark-date-picker-view[view="year"]')!

  await user.click(within(years).getByRole('button', { name: '2027' }))
  await waitFor(() => expect(picker().view).toBe('month'))

  await user.click(within(months).getByRole('button', { name: /^June/ }))

  await waitFor(() => expect(picker().view).toBe('day'))
  expect(screen.getByRole('button', { name: 'Switch to month view' })).toHaveTextContent('June 2027')
})

test('the locale formats the input and orders the week', async () => {
  await setup(Locale)
  await open()

  const headers = document.querySelectorAll('ark-date-picker-view[view="day"] ark-date-picker-table-header')
  expect(headers[0]).toHaveTextContent('Mo')
  expect(screen.getByRole('button', { name: /^Switch to month view/ })).toHaveTextContent('März 2025')

  await user.click(day(/20\. März 2025/))

  await waitFor(() => expect(input()).toHaveValue('20.03.2025'))
})

test('the controlled value attribute drives the input and selections are reported', async () => {
  await setup(Controlled)
  await waitFor(() => expect(input()).toHaveValue('01/01/2022'))

  picker().setAttribute('value', '2023-05-05')
  await waitFor(() => expect(input()).toHaveValue('05/05/2023'))

  await open()
  expect(day('Selected date. Friday, May 5, 2023')).toHaveAttribute('data-selected', '')

  await user.click(day(/May 9, 2023/))

  await waitFor(() => expect(picker()).toHaveAttribute('value', '2023-05-09'))
  expect(input()).toHaveValue('05/09/2023')
})

test('a controlled value ignores selections that are not applied', async () => {
  await setup((root) => {
    Basic(root)
    root.querySelector('ark-date-picker')!.setAttribute('value', '2025-03-10')
  })
  const valuechange = vi.fn()
  picker().addEventListener('valuechange', valuechange)
  await waitFor(() => expect(input()).toHaveValue('03/10/2025'))
  await open()

  await user.click(day(/March 20, 2025/))

  await waitFor(() => expect(lastValue(valuechange)).toEqual(['2025-03-20']))
  await settle()
  expect(input()).toHaveValue('03/10/2025')
  expect(picker().value).toEqual(['2025-03-10'])
})

test('an inline calendar is always shown and stays open after selecting', async () => {
  await setup(Inline)
  const valuechange = vi.fn()
  picker().addEventListener('valuechange', valuechange)

  await waitFor(() => expect(screen.getByRole('grid')).toBeVisible())
  expect(screen.queryByRole('button', { name: 'Open calendar' })).not.toBeInTheDocument()

  await user.click(day(/March 20, 2025/))

  await waitFor(() => expect(lastValue(valuechange)).toEqual(['2025-03-20']))
  expect(screen.getByRole('grid')).toBeVisible()
  expect(day('Selected date. Thursday, March 20, 2025')).toHaveAttribute('data-selected', '')
})
