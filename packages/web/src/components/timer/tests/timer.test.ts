import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/timer/basic.js'
import { mount as Countdown } from '../../../../examples/timer/countdown.js'
import { mount as Events } from '../../../../examples/timer/events.js'
import { mount } from '../../../test-utils.js'

const item = (type: string) => document.querySelector(`ark-timer-item[type="${type}"]`)!

const actionButton = (action: string) =>
  document.querySelector<HTMLButtonElement>(`ark-timer-action-trigger[action="${action}"] button`)!

let user: ReturnType<typeof userEvent.setup>

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
})

afterEach(() => {
  vi.useRealTimers()
})

test('a started timer counts up and reports each tick', async () => {
  mount(Events)
  await waitFor(() => expect(item('seconds')).toHaveTextContent('00'))

  await user.click(screen.getByRole('button', { name: 'Start' }))
  await vi.advanceTimersByTimeAsync(3500)

  await waitFor(() => expect(item('seconds')).toHaveTextContent('03'))
  expect(document.querySelector('output')).toHaveTextContent('Ticks: 3')
})

test('pausing stops the count and offers resume', async () => {
  mount(Basic)
  await waitFor(() => expect(item('minutes')).toHaveTextContent('40'))
  await user.click(screen.getByRole('button', { name: 'Play' }))
  await vi.advanceTimersByTimeAsync(2500)

  await user.click(screen.getByRole('button', { name: 'Pause' }))

  await waitFor(() => expect(item('seconds')).toHaveTextContent('02'))

  await vi.advanceTimersByTimeAsync(5000)

  expect(item('seconds')).toHaveTextContent('02')
  await waitFor(() => expect(screen.getByRole('button', { name: 'Resume' })).toBeVisible())
  expect(actionButton('pause')).not.toBeVisible()
})

test('a countdown stops at zero and reports completion', async () => {
  mount(Countdown)
  const timer = document.querySelector('ark-timer')!
  const complete = vi.fn()
  timer.addEventListener('complete', complete)
  await waitFor(() => expect(item('minutes')).toHaveTextContent('05'))
  timer.setAttribute('start-ms', '3000')
  await waitFor(() => expect(item('seconds')).toHaveTextContent('03'))

  await user.click(screen.getByRole('button', { name: 'Start' }))
  await vi.advanceTimersByTimeAsync(4000)

  await waitFor(() => expect(complete).toHaveBeenCalled())
  expect(item('minutes')).toHaveTextContent('00')
  expect(item('seconds')).toHaveTextContent('00')
  await waitFor(() => expect(actionButton('start')).toBeVisible())
})

test('only the action triggers that apply to the current state are shown', async () => {
  mount(Basic)
  const play = actionButton('start')
  const resume = actionButton('resume')
  const pause = actionButton('pause')

  await waitFor(() => expect(play).toBeVisible())
  expect(pause).not.toBeVisible()
  expect(resume).not.toBeVisible()

  await user.click(play)

  await waitFor(() => expect(play).not.toBeVisible())
  expect(pause).toBeVisible()
  expect(resume).not.toBeVisible()
})
