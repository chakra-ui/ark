import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Multiple } from '../examples/multiple.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const item = (value: string) =>
  document.querySelector<HTMLButtonElement>(`ark-toggle-group-item[value=${value}] button`)!

const group = () => document.querySelector('ark-toggle-group')!

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

const start = (example: (root: HTMLElement) => void, attributes: Record<string, string>) =>
  mount((container) => {
    example(container)
    const el = container.querySelector('ark-toggle-group')!
    for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value)
  })

test('the default value starts pressed inside a group', async () => {
  mount(Basic)

  await waitFor(() => expect(item('left')).toHaveAttribute('aria-pressed', 'true'))
  expect(screen.getByRole('group')).toBe(group())
  expect(group()).toHaveAttribute('data-orientation', 'horizontal')
  for (const value of ['center', 'right', 'justify']) expect(item(value)).toHaveAttribute('aria-pressed', 'false')
})

test('a single group presses the clicked item, releases the previous one and deselects on a second click', async () => {
  mount(Basic)
  await waitFor(() => expect(item('left')).toHaveAttribute('aria-pressed', 'true'))

  await user.click(item('center'))

  await waitFor(() => expect(item('center')).toHaveAttribute('aria-pressed', 'true'))
  expect(item('left')).toHaveAttribute('aria-pressed', 'false')

  await user.click(item('center'))

  await waitFor(() => expect(item('center')).toHaveAttribute('aria-pressed', 'false'))
  expect(group()).toHaveProperty('value', [])
})

test('deselectable false keeps the last pressed item pressed', async () => {
  start(Basic, { deselectable: 'false' })
  await waitFor(() => expect(item('left')).toHaveAttribute('aria-pressed', 'true'))

  await user.click(item('left'))
  await settle()

  expect(item('left')).toHaveAttribute('aria-pressed', 'true')
})

test('a multiple group toggles each item on its own and reports every pressed value', async () => {
  mount(Multiple)
  const changed = vi.fn()
  group().addEventListener('valuechange', (event) => changed((event as CustomEvent).detail.value))
  await waitFor(() => expect(item('bold')).toHaveAttribute('aria-pressed', 'true'))
  expect(group()).toHaveAttribute('data-multiple', '')

  await user.click(item('italic'))

  await waitFor(() => expect(changed).toHaveBeenLastCalledWith(['bold', 'italic']))
  expect(item('bold')).toHaveAttribute('aria-pressed', 'true')
  expect(item('italic')).toHaveAttribute('aria-pressed', 'true')

  await user.click(item('bold'))

  await waitFor(() => expect(changed).toHaveBeenLastCalledWith(['italic']))
  expect(item('bold')).toHaveAttribute('aria-pressed', 'false')
})

test('Tab focuses the pressed item and arrow keys, Home and End move focus with wrapping', async () => {
  mount(Basic)
  await waitFor(() => expect(item('left')).toHaveAttribute('aria-pressed', 'true'))

  await user.tab()
  await waitFor(() => expect(item('left')).toHaveFocus())

  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(item('center')).toHaveFocus())
  expect(item('center')).toHaveAttribute('tabindex', '0')
  expect(item('left')).toHaveAttribute('tabindex', '-1')
  expect(item('left')).toHaveAttribute('aria-pressed', 'true')

  await user.keyboard('{End}')
  await waitFor(() => expect(item('justify')).toHaveFocus())

  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(item('left')).toHaveFocus())

  await user.keyboard('{ArrowLeft}')
  await waitFor(() => expect(item('justify')).toHaveFocus())

  await user.keyboard('{Home}')
  await waitFor(() => expect(item('left')).toHaveFocus())
})

test('focus stops at the last item when loop-focus is false', async () => {
  start(Basic, { 'loop-focus': 'false' })
  await waitFor(() => expect(item('left')).toHaveAttribute('aria-pressed', 'true'))

  await user.click(item('justify'))
  await waitFor(() => expect(item('justify')).toHaveFocus())

  await user.keyboard('{ArrowRight}')
  await settle()

  expect(item('justify')).toHaveFocus()
})

test('arrow keys follow the reading direction in rtl', async () => {
  mount((root) => {
    root.dir = 'rtl'
    Basic(root)
  })
  await waitFor(() => expect(item('left')).toHaveAttribute('aria-pressed', 'true'))
  await user.tab()
  await waitFor(() => expect(item('left')).toHaveFocus())

  await user.keyboard('{ArrowLeft}')

  await waitFor(() => expect(item('center')).toHaveFocus())
})

test('vertical orientation moves focus with the up and down arrows', async () => {
  start(Basic, { orientation: 'vertical' })
  await waitFor(() => expect(item('left')).toHaveAttribute('data-orientation', 'vertical'))
  await user.tab()
  await waitFor(() => expect(item('left')).toHaveFocus())

  await user.keyboard('{ArrowRight}')
  await settle()
  expect(item('left')).toHaveFocus()

  await user.keyboard('{ArrowDown}')
  await waitFor(() => expect(item('center')).toHaveFocus())
})

test('the disabled attribute set after mount disables every item', async () => {
  mount(Basic)
  await waitFor(() => expect(item('left')).toBeEnabled())

  group().setAttribute('disabled', '')

  await waitFor(() => expect(group()).toHaveAttribute('data-disabled', ''))
  for (const value of ['left', 'center', 'right', 'justify']) expect(item(value)).toBeDisabled()
})

test('a controlled group reports clicks and follows its value attribute', async () => {
  mount(Controlled)
  await waitFor(() => expect(item('left')).toHaveAttribute('aria-pressed', 'true'))

  await user.click(item('right'))

  await waitFor(() => expect(item('right')).toHaveAttribute('aria-pressed', 'true'))
  expect(item('left')).toHaveAttribute('aria-pressed', 'false')

  group().setAttribute('value', 'justify')

  await waitFor(() => expect(item('justify')).toHaveAttribute('aria-pressed', 'true'))
  expect(item('right')).toHaveAttribute('aria-pressed', 'false')
})
