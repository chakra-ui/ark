import { screen, waitFor } from '@testing-library/dom'

import { mount as Basic } from '../examples/basic.js'
import { mount as ValueState } from '../examples/value-state.js'
import { mount } from '../../../test-utils.js'

test('the meter exposes its value, range and value text to assistive tech', async () => {
  mount(Basic)

  const meter = await screen.findByRole('meter', { name: 'Storage used' })

  await waitFor(() => expect(meter).toHaveAttribute('aria-valuenow', '24'))
  expect(meter).toHaveAttribute('aria-valuemin', '0')
  expect(meter).toHaveAttribute('aria-valuemax', '100')
  expect(meter).toHaveAttribute('aria-valuetext', '24%')
})

test('changing the value attribute updates the fill and the value text', async () => {
  mount(Basic)
  const meter = document.querySelector('ark-meter')!
  const range = document.querySelector('ark-meter-range')!
  const valueText = document.querySelector('ark-meter-value-text')!
  await waitFor(() => expect(valueText).toHaveTextContent('24%'))

  meter.setAttribute('value', '60')

  await waitFor(() => expect(meter).toHaveAttribute('aria-valuenow', '60'))
  await waitFor(() => expect(meter.style.getPropertyValue('--percent')).toBe('60'))
  expect(range).toHaveStyle({ width: '60%' })
  await waitFor(() => expect(valueText).toHaveTextContent('60%'))
})

test('low, high and optimum decide whether the value is optimal', async () => {
  mount(ValueState)
  const [optimal, suboptimal, leastOptimal] = document.querySelectorAll('ark-meter')

  await waitFor(() => expect(optimal).toHaveAttribute('data-state', 'optimal'))
  expect(suboptimal).toHaveAttribute('data-state', 'suboptimal')
  expect(leastOptimal).toHaveAttribute('data-state', 'least-optimal')
  expect(leastOptimal.querySelector('ark-meter-range')).toHaveAttribute('data-state', 'least-optimal')

  optimal.setAttribute('value', '95')

  await waitFor(() => expect(optimal).toHaveAttribute('data-state', 'least-optimal'))
})
