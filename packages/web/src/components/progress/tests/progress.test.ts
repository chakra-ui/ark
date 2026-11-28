import { screen, waitFor } from '@testing-library/dom'

import { mount as CircularBasic } from '../examples/circular/basic.js'
import { mount as CircularIndeterminate } from '../examples/circular/indeterminate.js'
import { mount as Basic } from '../examples/linear/basic.js'
import { mount as Controlled } from '../examples/linear/controlled.js'
import { mount as Indeterminate } from '../examples/linear/indeterminate.js'
import { mount as MinMax } from '../examples/linear/min-max.js'
import { mount as ValueText } from '../examples/linear/value-text.js'
import { mount as Vertical } from '../examples/linear/vertical.js'
import { mount } from '../../../test-utils.js'

const progress = () => document.querySelector('ark-progress')!

const bar = () => screen.getByRole('progressbar')

const text = () => document.querySelector('ark-progress-value-text')!

const range = () => document.querySelector<HTMLElement>('ark-progress-range')!

const start = (example: (root: HTMLElement) => void, attributes: Record<string, string>) =>
  mount((container) => {
    example(container)
    const el = container.querySelector('ark-progress')!
    for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value)
  })

test('the value fills the range and is announced on the progressbar', async () => {
  mount(Basic)

  await waitFor(() => expect(bar()).toHaveAttribute('aria-valuenow', '42'))
  expect(bar()).toHaveAttribute('aria-valuemin', '0')
  expect(bar()).toHaveAttribute('aria-valuemax', '100')
  expect(bar()).toHaveAttribute('aria-valuetext', '42%')
  expect(bar()).toHaveAttribute('aria-labelledby', document.querySelector('ark-progress-label')!.id)
  expect(text()).toHaveTextContent('42%')
  expect(range().style.width).toBe('42%')
  expect(progress()).toHaveAttribute('data-state', 'loading')
})

test('min and max set the range the percentage is computed from', async () => {
  mount(MinMax)

  await waitFor(() => expect(bar()).toHaveAttribute('aria-valuenow', '20'))
  expect(bar()).toHaveAttribute('aria-valuemin', '10')
  expect(bar()).toHaveAttribute('aria-valuemax', '30')
  expect(text()).toHaveTextContent('50%')
  expect(range().style.width).toBe('50%')
})

test('an empty value makes the progress indeterminate', async () => {
  mount(Indeterminate)

  await waitFor(() => expect(progress()).toHaveAttribute('data-state', 'indeterminate'))
  expect(bar()).not.toHaveAttribute('aria-valuenow')
  expect(bar()).not.toHaveAttribute('aria-valuetext')
  expect(text()).toBeEmptyDOMElement()
  expect(range().style.width).toBe('')
})

test('a controlled progress reports api changes and follows its value attribute', async () => {
  mount(Controlled)
  const changed = vi.fn()
  progress().addEventListener('valuechange', (event) => changed((event as CustomEvent).detail.value))
  await waitFor(() => expect(bar()).toHaveAttribute('aria-valuenow', '42'))

  progress().api!.setValue(65)

  await waitFor(() => expect(bar()).toHaveAttribute('aria-valuenow', '65'))
  expect(changed).toHaveBeenLastCalledWith(65)
  expect(text()).toHaveTextContent('65%')

  progress().setAttribute('value', '100')

  await waitFor(() => expect(progress()).toHaveAttribute('data-state', 'complete'))
  expect(text()).toHaveTextContent('100%')

  progress().setAttribute('value', '')

  await waitFor(() => expect(progress()).toHaveAttribute('data-state', 'indeterminate'))
  expect(bar()).not.toHaveAttribute('aria-valuenow')
})

test('a value past max is clamped to max', async () => {
  start(Basic, { value: '150' })

  await waitFor(() => expect(bar()).toHaveAttribute('aria-valuenow', '100'))
  expect(text()).toHaveTextContent('100%')
})

test('the value translation sets the aria-valuetext', async () => {
  mount(ValueText)

  await waitFor(() => expect(bar()).toHaveAttribute('aria-valuetext', '0 of 100 items loaded'))

  progress().setAttribute('value', '30')

  await waitFor(() => expect(bar()).toHaveAttribute('aria-valuetext', '30 of 100 items loaded'))
  expect(text()).toHaveTextContent('30%')
})

test('the locale formats the percentage text', async () => {
  start(Basic, { locale: 'de-DE' })

  await waitFor(() => expect(text().textContent).toBe('42 %'))
})

test('a vertical progress sizes the range by height', async () => {
  start(Vertical, { 'default-value': '25' })

  await waitFor(() => expect(bar()).toHaveAttribute('data-orientation', 'vertical'))
  expect(progress()).toHaveAttribute('data-orientation', 'vertical')
  expect(range().style.height).toBe('25%')
  expect(range().style.width).toBe('')
})

test('the circular variant puts the progressbar on the svg and the percent on the range circle', async () => {
  mount(CircularBasic)
  const svg = document.querySelector('ark-progress-circle svg')!
  const [track, circle] = svg.querySelectorAll<SVGCircleElement>('circle')

  await waitFor(() => expect(bar()).toBe(svg))
  expect(bar()).toHaveAttribute('aria-valuenow', '42')
  expect(text()).toHaveTextContent('42%')
  expect(circle.style.getPropertyValue('--percent')).toBe('42')
  expect(circle.style.strokeDasharray).toBe('var(--circumference)')
})

test('the indeterminate circular variant drops the value and the dash array', async () => {
  mount(CircularIndeterminate)
  const circle = document.querySelectorAll<SVGCircleElement>('ark-progress-circle circle')[1]

  await waitFor(() => expect(circle).toHaveAttribute('data-state', 'indeterminate'))
  expect(bar()).not.toHaveAttribute('aria-valuenow')
  expect(circle.style.strokeDasharray).toBe('')
  expect(text()).toBeEmptyDOMElement()
})
