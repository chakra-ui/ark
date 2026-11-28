import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Disabled } from '../examples/disabled.js'
import { mount as FormUsage } from '../examples/form-usage.js'
import { mount as HalfStar } from '../examples/half-star.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const group = () => document.querySelector('ark-rating-group')!

const item = (index: number) => document.querySelector<HTMLElement>(`ark-rating-group-item[index="${index}"]`)!

const input = () => document.querySelector<HTMLInputElement>('ark-rating-group-hidden-input input')!

const highlighted = () =>
  Array.from(document.querySelectorAll('ark-rating-group-item[data-highlighted]'), (el) =>
    Number(el.getAttribute('index')),
  )

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

const start = (example: (root: HTMLElement) => void, attributes: Record<string, string>) =>
  mount((container) => {
    example(container)
    const el = container.querySelector('ark-rating-group')!
    for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value)
  })

test('the default value checks its star, highlights the ones before it and fills the hidden input', async () => {
  mount(Basic)

  await waitFor(() => expect(screen.getByRole('radio', { name: '3 stars' })).toHaveAttribute('aria-checked', 'true'))
  expect(screen.getAllByRole('radio')).toHaveLength(5)
  expect(highlighted()).toEqual([1, 2, 3])
  expect(item(3)).toHaveAttribute('tabindex', '0')
  expect(item(1)).toHaveAttribute('tabindex', '-1')
  expect(item(2)).toHaveAttribute('aria-checked', 'false')
  expect(input()).toHaveValue('3')
  expect(screen.getByRole('radiogroup')).toHaveAttribute(
    'aria-labelledby',
    document.querySelector('ark-rating-group-label')!.id,
  )
})

test('clicking a star sets the rating and reports it through valuechange', async () => {
  mount(Basic)
  const changed = vi.fn()
  group().addEventListener('valuechange', (event) => changed((event as CustomEvent).detail.value))
  await waitFor(() => expect(input()).toHaveValue('3'))

  await user.click(item(5))

  await waitFor(() => expect(item(5)).toHaveAttribute('aria-checked', 'true'))
  expect(changed).toHaveBeenLastCalledWith(5)
  expect(highlighted()).toEqual([1, 2, 3, 4, 5])
  expect(input()).toHaveValue('5')
  expect(group()).toHaveProperty('value', 5)
})

test('hovering a star previews the rating until the pointer leaves', async () => {
  mount(Basic)
  const hovered = vi.fn()
  group().addEventListener('hoverchange', (event) => hovered((event as CustomEvent).detail.hoveredValue))
  await waitFor(() => expect(highlighted()).toEqual([1, 2, 3]))

  await user.hover(item(2))

  await waitFor(() => expect(highlighted()).toEqual([1, 2]))
  expect(hovered).toHaveBeenLastCalledWith(2)
  expect(item(3)).toHaveAttribute('aria-checked', 'true')

  await user.unhover(document.querySelector('ark-rating-group-control')!)

  await waitFor(() => expect(highlighted()).toEqual([1, 2, 3]))
  expect(input()).toHaveValue('3')
})

test('arrow keys, Home and End change the rating and follow it with focus', async () => {
  mount(Basic)
  await waitFor(() => expect(item(3)).toHaveAttribute('tabindex', '0'))

  await user.tab()
  expect(item(3)).toHaveFocus()

  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(item(4)).toHaveFocus())
  expect(item(4)).toHaveAttribute('aria-checked', 'true')

  await user.keyboard('{ArrowLeft}{ArrowLeft}')
  await waitFor(() => expect(item(2)).toHaveFocus())
  expect(input()).toHaveValue('2')

  await user.keyboard('{End}')
  await waitFor(() => expect(item(5)).toHaveFocus())

  await user.keyboard('{Home}')
  await waitFor(() => expect(item(1)).toHaveFocus())
  expect(input()).toHaveValue('1')
})

test('arrow keys follow the reading direction in rtl', async () => {
  mount((root) => {
    root.dir = 'rtl'
    Basic(root)
  })
  await waitFor(() => expect(item(3)).toHaveAttribute('tabindex', '0'))
  await user.tab()

  await user.keyboard('{ArrowLeft}')

  await waitFor(() => expect(item(4)).toHaveAttribute('aria-checked', 'true'))
})

test('allow-half shows a half star and steps the keyboard by halves', async () => {
  mount(HalfStar)
  const hovered = vi.fn()
  group().addEventListener('hoverchange', (event) => hovered((event as CustomEvent).detail.hoveredValue))
  await waitFor(() => expect(item(3)).toHaveAttribute('data-half', ''))
  expect(screen.getByRole('radio', { name: '2.5 stars' })).toBe(item(3))
  expect(item(3)).toHaveAttribute('aria-checked', 'true')
  expect(item(2)).not.toHaveAttribute('data-half')
  expect(input()).toHaveValue('2.5')

  await user.tab()
  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(input()).toHaveValue('3'))
  expect(item(3)).not.toHaveAttribute('data-half')

  await user.keyboard('{ArrowLeft}{ArrowLeft}')

  await waitFor(() => expect(input()).toHaveValue('2'))
  expect(item(2)).toHaveAttribute('aria-checked', 'true')
})

test('hovering the first half of a star previews a half rating when allow-half is set', async () => {
  mount(HalfStar)
  const hovered = vi.fn()
  group().addEventListener('hoverchange', (event) => hovered((event as CustomEvent).detail.hoveredValue))
  await waitFor(() => expect(item(3)).toHaveAttribute('data-half', ''))
  item(5).getBoundingClientRect = () => new DOMRect(100, 0, 20, 20)

  await user.pointer({ target: item(5), coords: { clientX: 105, clientY: 10 } })

  await waitFor(() => expect(item(5)).toHaveAttribute('data-half', ''))
  expect(hovered).toHaveBeenLastCalledWith(4.5)
  expect(highlighted()).toEqual([1, 2, 3, 4, 5])

  await user.click(item(5))

  await waitFor(() => expect(input()).toHaveValue('4.5'))
})

test('a readonly group keeps its rating and only the checked star is focusable', async () => {
  start(Basic, { readonly: '' })
  await waitFor(() => expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-readonly', 'true'))
  expect(item(3)).toHaveAttribute('tabindex', '0')
  expect(item(4)).not.toHaveAttribute('tabindex')
  expect(input()).toHaveAttribute('readonly')

  await user.click(item(5))
  await user.hover(item(1))
  await settle()

  expect(input()).toHaveValue('3')
  expect(highlighted()).toEqual([1, 2, 3])
})

test('a disabled group ignores clicks and cannot be focused', async () => {
  mount(Disabled)
  await waitFor(() => expect(item(1)).toHaveAttribute('aria-disabled', 'true'))
  expect(group()).toHaveAttribute('data-disabled', '')
  expect(item(3)).not.toHaveAttribute('tabindex')
  expect(input()).toBeDisabled()

  await user.click(item(5))
  await user.tab()
  await settle()

  expect(input()).toHaveValue('3')
  expect(document.body).toHaveFocus()
})

test('a controlled group reports clicks and follows its value attribute', async () => {
  mount(Controlled)
  const changed = vi.fn()
  group().addEventListener('valuechange', (event) => changed((event as CustomEvent).detail.value))
  await waitFor(() => expect(item(1)).toHaveAttribute('tabindex', '0'))
  expect(highlighted()).toEqual([])

  await user.click(item(4))

  await waitFor(() => expect(item(4)).toHaveAttribute('aria-checked', 'true'))
  expect(changed).toHaveBeenCalledWith(4)
  expect(highlighted()).toEqual([1, 2, 3, 4])

  group().setAttribute('value', '2')

  await waitFor(() => expect(item(2)).toHaveAttribute('aria-checked', 'true'))
  expect(item(4)).toHaveAttribute('aria-checked', 'false')
  expect(input()).toHaveValue('2')
})

test('the rating is submitted with its form under the name attribute', async () => {
  mount(FormUsage)
  await waitFor(() => expect(input()).toHaveValue('3'))

  await user.click(item(4))
  await waitFor(() => expect(input()).toHaveValue('4'))
  await user.click(screen.getByRole('button', { name: 'Submit' }))

  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('Rating value: 4'))
})
