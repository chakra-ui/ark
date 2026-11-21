import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/clipboard/basic.js'
import { mount as Controlled } from '../../../../examples/clipboard/controlled.js'
import { mount as CopyStatus } from '../../../../examples/clipboard/copy-status.js'
import { mount as Timeout } from '../../../../examples/clipboard/timeout.js'
import { mount } from '../../../test-utils.js'

afterEach(() => {
  vi.useRealTimers()
})

test('clipboard copies the value and switches the indicator', async () => {
  const user = userEvent.setup()
  mount(Basic)
  const root = document.querySelector('ark-clipboard')!
  const trigger = await screen.findByRole('button', { name: 'Copy to clipboard' })

  await waitFor(() => expect(document.querySelector('ark-clipboard-input input')).toHaveValue('https://ark-ui.com'))
  expect(document.querySelector('ark-clipboard-indicator[copied]')).not.toBeVisible()

  await user.click(trigger)

  await waitFor(() => expect(root).toHaveAttribute('data-copied', ''))
  expect(screen.getByRole('button', { name: 'Copied to clipboard' })).toBeVisible()
  expect(document.querySelector('ark-clipboard-indicator[copied]')).toBeVisible()
  expect(document.querySelector('ark-clipboard-indicator:not([copied])')).not.toBeVisible()
  expect(await navigator.clipboard.readText()).toBe('https://ark-ui.com')
})

test('clipboard emits statuschange and renders its value text', async () => {
  const user = userEvent.setup()
  mount(CopyStatus)

  await waitFor(() =>
    expect(document.querySelector('ark-clipboard-value-text')).toHaveTextContent('https://ark-ui.com'),
  )

  await user.click(screen.getByRole('button'))

  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('1'))
})

test('clipboard resets after its timeout', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] })
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
  mount(Timeout)
  const root = document.querySelector('ark-clipboard')!

  await vi.advanceTimersByTimeAsync(0)
  await user.click(screen.getByRole('button'))
  await vi.advanceTimersByTimeAsync(0)
  expect(root).toHaveAttribute('data-copied', '')

  await vi.advanceTimersByTimeAsync(4000)
  expect(root).toHaveAttribute('data-copied', '')

  await vi.advanceTimersByTimeAsync(1100)
  expect(root).not.toHaveAttribute('data-copied')
  expect(document.querySelector('ark-clipboard-indicator:not([copied])')).toBeVisible()
})

test('controlled clipboard syncs the input with the value attribute', async () => {
  const user = userEvent.setup()
  mount(Controlled)
  const input = document.querySelector('ark-clipboard-input input')!

  await waitFor(() => expect(input).toHaveValue('https://ark-ui.com'))

  await user.click(screen.getByRole('button', { name: 'Change Url' }))
  await waitFor(() => expect(input).toHaveValue('https://chakra-ui.com'))

  await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }))
  await waitFor(async () => expect(await navigator.clipboard.readText()).toBe('https://chakra-ui.com'))
})
