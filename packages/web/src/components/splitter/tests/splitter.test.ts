import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Collapsible } from '../examples/collapsible.js'
import { mount as MultiplePanels } from '../examples/multiple-panels.js'
import { mount as Vertical } from '../examples/vertical.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const splitter = () => document.querySelector('ark-splitter')!

const panel = (value: string) => document.querySelector<HTMLElement>(`ark-splitter-panel[value="${value}"]`)!

const separator = (value: string) =>
  document.querySelector<HTMLElement>(`ark-splitter-resize-trigger[value="${value}"]`)!

const grow = (value: string) => Number(panel(value).style.flexGrow)

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

const measured = (
  example: (root: HTMLElement) => void,
  attributes: Record<string, string> = {},
  setup: (root: HTMLElement) => void = () => {},
) =>
  mount((container) => {
    setup(container)
    example(container)
    for (const el of container.querySelectorAll('ark-splitter-panel')) {
      el.getBoundingClientRect = () => new DOMRect(0, 0, 400, 400)
    }
    const el = container.querySelector('ark-splitter')!
    for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value)
  })

test('panels split the space evenly and the separator reports the first panel size', async () => {
  measured(Basic)

  await waitFor(() => expect(screen.getByRole('separator')).toHaveAttribute('aria-valuenow', '50'))
  expect(separator('a:b')).toHaveAttribute('aria-valuemin', '0')
  expect(separator('a:b')).toHaveAttribute('aria-valuemax', '100')
  expect(separator('a:b')).toHaveAttribute('aria-orientation', 'vertical')
  expect(separator('a:b')).toHaveAttribute('aria-controls', `${panel('a').id} ${panel('b').id}`)
  expect(separator('a:b')).toHaveAttribute('tabindex', '0')
  expect(grow('a')).toBe(50)
  expect(grow('b')).toBe(50)
  expect(splitter()).toHaveProperty('size', [50, 50])
})

test('arrow keys resize the panels around the focused separator and report resize', async () => {
  measured(Basic)
  const resized = vi.fn()
  splitter().addEventListener('resize', (event) => resized((event as CustomEvent).detail.size))
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '50'))

  await user.tab()
  expect(separator('a:b')).toHaveFocus()
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('data-focus', ''))

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '51'))
  expect(grow('a')).toBe(51)
  expect(grow('b')).toBe(49)
  expect(resized).toHaveBeenLastCalledWith([51, 49])

  await user.keyboard('{ArrowLeft}{ArrowLeft}')

  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '49'))

  await user.keyboard('{Shift>}{ArrowRight}{/Shift}')

  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '59'))
})

test('Home and End move the separator to its limits', async () => {
  measured(Basic)
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '50'))
  await user.tab()

  await user.keyboard('{End}')
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '100'))
  expect(grow('b')).toBe(0)

  await user.keyboard('{Home}')
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '0'))
  expect(grow('a')).toBe(0)
})

test('keyboard-resize-by sets the arrow key step', async () => {
  measured(Basic, { 'keyboard-resize-by': '5' })
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '50'))
  await user.tab()

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '55'))
})

test('panel min and max sizes bound the keyboard resize', async () => {
  measured(MultiplePanels)
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '20'))
  expect(separator('a:b')).toHaveAttribute('aria-valuemin', '20')
  expect(separator('a:b')).toHaveAttribute('aria-valuemax', '40')
  expect(panel('b').style.minWidth).toBe('40%')
  await user.tab()

  await user.keyboard('{End}')
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '40'))
  expect(grow('b')).toBe(40)
  expect(separator('b:c')).toHaveAttribute('aria-valuenow', '40')

  await user.keyboard('{Home}{ArrowLeft}')
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '20'))
  await settle()
  expect(separator('a:b')).toHaveAttribute('aria-valuenow', '20')
  expect(grow('c')).toBe(20)
})

test('F6 moves focus to the next separator', async () => {
  measured(MultiplePanels)
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '20'))
  await user.tab()
  expect(separator('a:b')).toHaveFocus()

  await user.keyboard('{F6}')

  await waitFor(() => expect(separator('b:c')).toHaveFocus())
})

test('Enter collapses a collapsible panel and expands it again', async () => {
  measured(Collapsible)
  const collapsed = vi.fn()
  const expanded = vi.fn()
  splitter().addEventListener('collapse', (event) => collapsed((event as CustomEvent).detail))
  splitter().addEventListener('expand', (event) => expanded((event as CustomEvent).detail))
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '20'))
  expect(separator('a:b')).toHaveAttribute('aria-valuemin', '5')
  await user.tab()

  await user.keyboard('{Enter}')

  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '5'))
  expect(grow('a')).toBe(5)
  expect(panel('a').style.minWidth).toBe('5%')
  expect(collapsed).toHaveBeenLastCalledWith({ panelId: 'a', size: 5, source: 'keyboard' })
  expect(splitter().api!.isPanelCollapsed('a')).toBe(true)

  await user.keyboard('{Enter}')

  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '20'))
  expect(expanded).toHaveBeenLastCalledWith({ panelId: 'a', size: 20, source: 'keyboard' })
})

test('a vertical splitter resizes with the up and down arrows', async () => {
  measured(Vertical)
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '50'))
  expect(separator('a:b')).toHaveAttribute('aria-orientation', 'horizontal')
  expect(splitter()).toHaveAttribute('data-orientation', 'vertical')
  await user.tab()

  await user.keyboard('{ArrowRight}')
  await settle()
  expect(separator('a:b')).toHaveAttribute('aria-valuenow', '50')

  await user.keyboard('{ArrowDown}')

  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '51'))
})

test('arrow keys follow the reading direction in rtl', async () => {
  measured(Basic, {}, (root) => {
    root.dir = 'rtl'
  })
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '50'))
  await user.tab()

  await user.keyboard('{ArrowLeft}')

  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '51'))
})

test('the disabled attribute set after mount locks the separator', async () => {
  measured(Basic)
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('tabindex', '0'))

  splitter().setAttribute('disabled', '')

  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-disabled', 'true'))
  expect(separator('a:b')).not.toHaveAttribute('tabindex')
  expect(separator('a:b')).toHaveAttribute('data-disabled', '')

  await user.tab()
  await settle()
  expect(separator('a:b')).not.toHaveFocus()
})

test('the size attribute set after mount controls the panel sizes', async () => {
  measured(Basic)
  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '50'))

  splitter().setAttribute('size', '30, 70')

  await waitFor(() => expect(separator('a:b')).toHaveAttribute('aria-valuenow', '30'))
  expect(grow('a')).toBe(30)
  expect(grow('b')).toBe(70)
})
