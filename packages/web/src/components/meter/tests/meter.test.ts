import { screen, waitFor } from '@testing-library/dom'

import { mount as Basic } from '../../../../examples/meter/basic.js'
import { mount as ValueState } from '../../../../examples/meter/value-state.js'
import { mount } from '../../../test-utils.js'

test('meter exposes role and aria values', async () => {
  mount(Basic)
  const meter = await screen.findByRole('meter', { name: 'Storage used' })

  await waitFor(() => expect(meter).toHaveAttribute('aria-valuenow', '24'))
  expect(meter).toHaveAttribute('aria-valuemin', '0')
  expect(meter).toHaveAttribute('aria-valuemax', '100')
  expect(meter).toHaveAttribute('aria-valuetext', '24%')
})

test('changing the value attribute updates the range and value text', async () => {
  mount(Basic)
  const meter = document.querySelector('ark-meter')!
  const range = document.querySelector('ark-meter-range')!
  const valueText = document.querySelector('ark-meter-value-text')!

  await waitFor(() => expect(valueText).toHaveTextContent('24%'))

  meter.setAttribute('value', '60')

  await waitFor(() => expect(meter).toHaveAttribute('aria-valuenow', '60'))
  await waitFor(() => expect(meter.style.getPropertyValue('--percent')).toBe('60'))
  expect(range.getAttribute('style')).toMatch(/width: 60%/)
  await waitFor(() => expect(valueText).toHaveTextContent('60%'))
})

test('low, high and optimum set the value state', async () => {
  mount(ValueState)
  const meters = document.querySelectorAll('ark-meter')

  await waitFor(() => expect(meters[0]).toHaveAttribute('data-state', 'optimal'))
  expect(meters[1]).toHaveAttribute('data-state', 'suboptimal')
  expect(meters[2]).toHaveAttribute('data-state', 'least-optimal')
  expect(meters[2].querySelector('ark-meter-range')).toHaveAttribute('data-state', 'least-optimal')

  meters[0].setAttribute('value', '95')

  await waitFor(() => expect(meters[0]).toHaveAttribute('data-state', 'least-optimal'))
})
