import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Formatting } from '../examples/formatting.js'
import { mount as PrefixSuffix } from '../examples/prefix-suffix.js'
import { mount as Pricing } from '../examples/pricing.js'
import { mount as Trend } from '../examples/trend.js'
import { mount as WithTimer } from '../examples/with-timer.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

afterEach(() => {
  document.body.innerHTML = ''
})

const digits = (flow: Element) => Array.from(flow.querySelectorAll('[data-number-flow-digit]'))

test('number flow renders a digit per place and announces the value', async () => {
  mount(Basic)
  const flow = document.querySelector('ark-number-flow')!
  await waitFor(() => expect(digits(flow)).toHaveLength(4))
  expect(flow.querySelector('[data-number-flow-digit-track]')).toBeInTheDocument()
  expect(document.querySelector('ark-number-flow-value-text')).toHaveTextContent('1,248')
})

test('number flow updates when the value property changes and reuses its digits', async () => {
  mount(Basic)
  const flow = document.querySelector('ark-number-flow')!
  await waitFor(() => expect(digits(flow)).toHaveLength(4))
  const first = digits(flow)[0]
  await user.click(screen.getByRole('button', { name: 'Follow' }))
  await waitFor(() => expect(flow.value).toBe(1249))
  await waitFor(() => expect(flow.api?.valueText).toBe('1,249'))
  expect(digits(flow)[0]).toBe(first)
})

test('number flow renders prefix and suffix as symbols', async () => {
  mount(PrefixSuffix)
  const flow = document.querySelector('ark-number-flow')!
  await waitFor(() => expect(flow.querySelectorAll('[data-number-flow-symbol]').length).toBeGreaterThan(0))
  expect(flow.querySelector('[data-key=prefix]')).toHaveTextContent('~')
  expect(flow.querySelector('[data-key=suffix]')).toHaveTextContent('req/s')
})

test('number flow formats with formatOptions', async () => {
  mount(Formatting)
  const texts = () => Array.from(document.querySelectorAll('ark-number-flow-value-text'), (el) => el.textContent)
  await waitFor(() => expect(texts()[0]).toBe('$48,250.75'))
  expect(texts()[1]).toBe('+12.4%')
  expect(texts()[2]).toBe('1.3M')
})

test('number flow follows a countdown timer and resets with it', async () => {
  mount(WithTimer)
  const [minutes, seconds] = document.querySelectorAll('ark-number-flow')
  await waitFor(() => expect([minutes.value, seconds.value]).toEqual([5, 0]))
  await user.click(screen.getByRole('button', { name: 'Start' }))
  await waitFor(() => expect(minutes.value).toBe(4), { timeout: 3000 })
  await user.click(screen.getByRole('button', { name: 'Reset' }))
  await waitFor(() => expect([minutes.value, seconds.value]).toEqual([5, 0]))
})

test('number flow renders the initial timer value in place and rolls on change', async () => {
  mount(WithTimer)
  const [minutes, seconds] = document.querySelectorAll('ark-number-flow')
  await document.querySelector('ark-timer')!.ready
  await waitFor(() => expect([minutes.api?.valueText, seconds.api?.valueText]).toEqual(['05', '00']))
  expect(minutes).toHaveAttribute('data-state', 'idle')
  expect(seconds).toHaveAttribute('data-state', 'idle')
  minutes.value = 4
  await waitFor(() => expect(minutes).toHaveAttribute('data-state', 'rolling'))
})

test('pricing switches the price and caption with the billing period', async () => {
  mount(Pricing)
  const flow = document.querySelector('ark-number-flow')!
  await waitFor(() => expect(flow.value).toBe(24))
  await user.click(screen.getByRole('button', { name: 'Yearly' }))
  await waitFor(() => expect(flow.value).toBe(19.2))
  expect(screen.getByRole('button', { name: 'Yearly' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByText(/You save 20%/)).toBeInTheDocument()
})

test('trend moves the price and its change badge together', async () => {
  vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] })
  try {
    mount(Trend)
    const [change, price] = document.querySelectorAll('ark-number-flow')
    await waitFor(() => expect(price.value).toBe(182.4))
    vi.advanceTimersByTime(1600)
    await waitFor(() => expect(price.value).not.toBe(182.4))
    expect(change.value).toBeCloseTo((price.value - 182.4) / 182.4)
    const badge = change.closest('[data-trend]')!
    expect(badge.getAttribute('data-trend')).toBe(change.value >= 0 ? 'up' : 'down')
  } finally {
    vi.useRealTimers()
  }
})
