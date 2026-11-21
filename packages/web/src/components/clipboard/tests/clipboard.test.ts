import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/clipboard/basic.js'
import { mount as Controlled } from '../../../../examples/clipboard/controlled.js'
import { mount as CopyStatus } from '../../../../examples/clipboard/copy-status.js'
import { mount as Timeout } from '../../../../examples/clipboard/timeout.js'
import { mount } from '../../../test-utils.js'

const clipboard = () => document.querySelector('ark-clipboard')

const input = () => document.querySelector('ark-clipboard-input input')

const copiedIndicator = () => document.querySelector('ark-clipboard-indicator[copied]')

const idleIndicator = () => document.querySelector('ark-clipboard-indicator:not([copied])')

const clipboardText = () => navigator.clipboard.readText()

afterEach(() => {
  vi.useRealTimers()
})

test('clicking the trigger copies the value and shows the copied indicator', async () => {
  const user = userEvent.setup()
  mount(Basic)
  const trigger = await screen.findByRole('button', { name: 'Copy to clipboard' })
  await waitFor(() => expect(input()).toHaveValue('https://ark-ui.com'))
  expect(copiedIndicator()).not.toBeVisible()

  await user.click(trigger)

  await waitFor(() => expect(clipboard()).toHaveAttribute('data-copied', ''))
  expect(screen.getByRole('button', { name: 'Copied to clipboard' })).toBeVisible()
  expect(copiedIndicator()).toBeVisible()
  expect(idleIndicator()).not.toBeVisible()
  expect(await clipboardText()).toBe('https://ark-ui.com')
})

test('the value text shows the value and copying reports a status change', async () => {
  const user = userEvent.setup()
  mount(CopyStatus)
  await waitFor(() =>
    expect(document.querySelector('ark-clipboard-value-text')).toHaveTextContent('https://ark-ui.com'),
  )

  await user.click(screen.getByRole('button'))

  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('1'))
})

test('the copied state resets once the timeout passes', async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] })
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
  mount(Timeout)
  await vi.advanceTimersByTimeAsync(0)

  await user.click(screen.getByRole('button'))
  await vi.advanceTimersByTimeAsync(0)

  expect(clipboard()).toHaveAttribute('data-copied', '')

  await vi.advanceTimersByTimeAsync(4000)

  expect(clipboard()).toHaveAttribute('data-copied', '')

  await vi.advanceTimersByTimeAsync(1100)

  expect(clipboard()).not.toHaveAttribute('data-copied')
  expect(idleIndicator()).toBeVisible()
})

test('changing the value attribute updates the input and what gets copied', async () => {
  const user = userEvent.setup()
  mount(Controlled)
  await waitFor(() => expect(input()).toHaveValue('https://ark-ui.com'))

  await user.click(screen.getByRole('button', { name: 'Change Url' }))

  await waitFor(() => expect(input()).toHaveValue('https://chakra-ui.com'))

  await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }))

  await waitFor(async () => expect(await clipboardText()).toBe('https://chakra-ui.com'))
})
