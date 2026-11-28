import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Delay } from '../examples/delay.js'
import { mount as MultipleTriggers } from '../examples/multiple-triggers.js'
import { mount } from '../../../test-utils.js'

let user: ReturnType<typeof userEvent.setup>

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
})

afterEach(() => {
  vi.useRealTimers()
})

const hoverCard = () => document.querySelector('ark-hover-card')!

const content = () => document.querySelector('ark-hover-card-content')!

const link = (name: string) => screen.getByRole('link', { name })

test('hovering the trigger opens the card after the open delay', async () => {
  mount(Delay)
  await hoverCard().ready

  await user.hover(link('@sarah_chen'))
  await vi.advanceTimersByTimeAsync(150)
  expect(hoverCard().open).toBe(false)
  expect(content()).not.toBeVisible()

  await vi.advanceTimersByTimeAsync(100)

  await waitFor(() => expect(hoverCard().open).toBe(true))
  expect(content()).toBeVisible()
  expect(link('@sarah_chen')).toHaveAttribute('data-state', 'open')
})

test('leaving the trigger closes the card after the close delay', async () => {
  mount(Delay)
  await hoverCard().ready
  await user.hover(link('@sarah_chen'))
  await vi.advanceTimersByTimeAsync(250)
  await waitFor(() => expect(hoverCard().open).toBe(true))

  await user.unhover(link('@sarah_chen'))
  await vi.advanceTimersByTimeAsync(400)
  expect(hoverCard().open).toBe(true)

  await vi.advanceTimersByTimeAsync(200)

  await waitFor(() => expect(hoverCard().open).toBe(false))
  await waitFor(() => expect(content()).not.toBeVisible())
})

test('moving the pointer from the trigger toward the content keeps the card open', async () => {
  mount(Delay)
  await hoverCard().ready
  link('@sarah_chen').getBoundingClientRect = () => new DOMRect(0, 0, 100, 20)
  content().getBoundingClientRect = () => new DOMRect(0, 30, 300, 200)
  await user.pointer({ target: link('@sarah_chen'), coords: { clientX: 50, clientY: 10 } })
  await vi.advanceTimersByTimeAsync(250)
  await waitFor(() => expect(hoverCard().open).toBe(true))

  await user.pointer({
    target: screen.getByText('Design Engineer at Acme Inc.'),
    coords: { clientX: 50, clientY: 100 },
  })
  await vi.advanceTimersByTimeAsync(1000)

  expect(hoverCard().open).toBe(true)
  expect(content()).toBeVisible()

  await user.pointer({ target: document.body, coords: { clientX: 600, clientY: 600 } })
  await vi.advanceTimersByTimeAsync(600)

  await waitFor(() => expect(hoverCard().open).toBe(false))
})

test('focusing the trigger with the keyboard opens the card and blurring closes it', async () => {
  mount(Delay)
  await hoverCard().ready

  await user.tab()
  expect(link('@sarah_chen')).toHaveFocus()
  await vi.advanceTimersByTimeAsync(250)
  await waitFor(() => expect(hoverCard().open).toBe(true))

  await user.tab()

  await waitFor(() => expect(hoverCard().open).toBe(false))
})

test('Escape closes an open card', async () => {
  mount(Basic)
  const openchange = vi.fn()
  hoverCard().addEventListener('openchange', openchange)
  await hoverCard().ready
  await user.hover(link('@sarah_chen'))
  await vi.advanceTimersByTimeAsync(700)
  await waitFor(() => expect(hoverCard().open).toBe(true))

  await user.keyboard('{Escape}')

  await waitFor(() => expect(hoverCard().open).toBe(false))
  expect(openchange.mock.lastCall?.[0].detail.open).toBe(false)
})

test('default-open shows the card without any interaction', async () => {
  mount((root) => {
    Basic(root)
    root.querySelector('ark-hover-card')!.setAttribute('default-open', '')
  })
  await hoverCard().ready

  await waitFor(() => expect(content()).toBeVisible())
  expect(hoverCard().open).toBe(true)
})

test('a disabled card does not open on hover', async () => {
  mount((root) => {
    Basic(root)
    root.querySelector('ark-hover-card')!.setAttribute('disabled', '')
  })
  await hoverCard().ready

  await user.hover(link('@sarah_chen'))
  await vi.advanceTimersByTimeAsync(1000)

  expect(hoverCard().open).toBe(false)
  expect(content()).not.toBeVisible()
})

test('the controlled open attribute opens and closes the card', async () => {
  mount(Controlled)
  await hoverCard().ready
  expect(content()).not.toBeVisible()

  await user.click(screen.getByRole('button', { name: 'Toggle' }))
  await waitFor(() => expect(content()).toBeVisible())
  expect(hoverCard().open).toBe(true)

  await user.click(screen.getByRole('button', { name: 'Toggle' }))
  await waitFor(() => expect(content()).not.toBeVisible())
  expect(hoverCard().open).toBe(false)
})

test('a controlled card reports hover through openchange', async () => {
  mount(Controlled)
  const openchange = vi.fn()
  hoverCard().addEventListener('openchange', openchange)
  await hoverCard().ready

  await user.hover(link('@sarah_chen'))
  await vi.advanceTimersByTimeAsync(700)

  await waitFor(() => expect(openchange.mock.lastCall?.[0].detail.open).toBe(true))
  await waitFor(() => expect(content()).toBeVisible())
})

test('each trigger opens the card for its own value', async () => {
  mount(MultipleTriggers)
  const triggervaluechange = vi.fn()
  hoverCard().addEventListener('triggervaluechange', triggervaluechange)
  await hoverCard().ready

  await user.hover(link('@alex_r'))
  await vi.advanceTimersByTimeAsync(700)
  await waitFor(() => expect(hoverCard().open).toBe(true))
  expect(triggervaluechange.mock.lastCall?.[0].detail.value).toBe('alex')
  expect(link('@alex_r')).toHaveAttribute('data-current', '')
  expect(link('@sarah_chen')).not.toHaveAttribute('data-current')

  await user.hover(link('@jordan_lee'))

  await waitFor(() => expect(link('@jordan_lee')).toHaveAttribute('data-current', ''))
  expect(triggervaluechange.mock.lastCall?.[0].detail.value).toBe('jordan')
  expect(link('@alex_r')).not.toHaveAttribute('data-current')
  expect(hoverCard().open).toBe(true)
})
