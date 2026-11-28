import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Action } from '../examples/action.js'
import { mount as Basic } from '../examples/basic.js'
import { mount as Duration } from '../examples/duration.js'
import { mount as MaxToasts } from '../examples/max-toasts.js'
import { mount as Placement } from '../examples/placement.js'
import { mount as PromiseToast } from '../examples/promise-toast.js'
import { mount as Types } from '../examples/types.js'
import { mount as Update } from '../examples/update.js'
import { mount } from '../../../test-utils.js'

let user: ReturnType<typeof userEvent.setup>

let store: { remove(): void; resume(): void } | undefined

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
})

afterEach(() => {
  store?.resume()
  store?.remove()
  store = undefined
  vi.useRealTimers()
  vi.restoreAllMocks()
})

const setup = async (example: (root: HTMLElement) => void) => {
  mount(example)
  const toaster = document.querySelector('ark-toaster')!
  store = toaster.toaster
  await toaster.ready
  return toaster
}

const toasts = () => screen.queryAllByRole('status')

const visibleToasts = () => toasts().filter((toast) => toast.getAttribute('data-state') === 'open')

test('clicking the button shows a toast with its title and description', async () => {
  await setup(Basic)
  expect(toasts()).toHaveLength(0)

  await user.click(screen.getByRole('button', { name: 'Schedule meeting' }))

  const toast = await screen.findByRole('status')
  await waitFor(() => expect(toast).toHaveAttribute('data-state', 'open'))
  expect(within(toast).getByText('Scheduled for tomorrow')).toBeVisible()
  expect(within(toast).getByText('Your meeting has been scheduled for tomorrow at 10am.')).toBeVisible()
  expect(toast).toHaveAccessibleName('Scheduled for tomorrow')
  expect(toast).toHaveAccessibleDescription('Your meeting has been scheduled for tomorrow at 10am.')
  expect(toast).toHaveAttribute('data-type', 'info')
})

test('the close trigger dismisses the toast', async () => {
  await setup(Basic)
  await user.click(screen.getByRole('button', { name: 'Schedule meeting' }))
  const toast = await screen.findByRole('status')

  await user.click(within(toast).getByRole('button', { name: 'Dismiss notification' }))

  await waitFor(() => expect(toast).toHaveAttribute('data-state', 'closed'))
  await vi.advanceTimersByTimeAsync(500)
  await waitFor(() => expect(toasts()).toHaveLength(0))
})

test('Escape dismisses a focused toast', async () => {
  await setup(Basic)
  await user.click(screen.getByRole('button', { name: 'Schedule meeting' }))
  const toast = await screen.findByRole('status')
  toast.focus()

  await user.keyboard('{Escape}')

  await waitFor(() => expect(toast).toHaveAttribute('data-state', 'closed'))
})

test('each toast type is reflected on the toast', async () => {
  await setup(Types)

  await user.click(screen.getByRole('button', { name: 'Success' }))
  await user.click(screen.getByRole('button', { name: 'Error' }))
  await user.click(screen.getByRole('button', { name: 'Warning' }))

  await waitFor(() => expect(toasts()).toHaveLength(3))
  expect(screen.getByRole('status', { name: 'Changes saved' })).toHaveAttribute('data-type', 'success')
  expect(screen.getByRole('status', { name: 'Upload failed' })).toHaveAttribute('data-type', 'error')
  expect(screen.getByRole('status', { name: 'Low storage' })).toHaveAttribute('data-type', 'warning')
})

test('a toast dismisses itself after its duration', async () => {
  await setup(Duration)

  await user.click(screen.getByRole('button', { name: '1s' }))
  const toast = await screen.findByRole('status')
  await waitFor(() => expect(toast).toHaveAttribute('data-state', 'open'))

  await vi.advanceTimersByTimeAsync(800)
  expect(toast).toHaveAttribute('data-state', 'open')

  await vi.advanceTimersByTimeAsync(400)
  await waitFor(() => expect(toast).toHaveAttribute('data-state', 'closed'))
  await vi.advanceTimersByTimeAsync(500)
  await waitFor(() => expect(toasts()).toHaveLength(0))
})

test('an infinite duration keeps the toast until it is dismissed', async () => {
  await setup(Duration)

  await user.click(screen.getByRole('button', { name: '∞' }))
  const toast = await screen.findByRole('status')

  await vi.advanceTimersByTimeAsync(60_000)

  expect(toast).toHaveAttribute('data-state', 'open')
  expect(toast).toBeInTheDocument()
})

test('hovering the toast region pauses the countdown and leaving resumes it', async () => {
  await setup(Duration)
  await user.click(screen.getByRole('button', { name: '1s' }))
  const toast = await screen.findByRole('status')

  await user.hover(toast)
  await waitFor(() => expect(toast).toHaveAttribute('data-paused', ''))
  await vi.advanceTimersByTimeAsync(3000)
  expect(toast).toHaveAttribute('data-state', 'open')

  await user.unhover(toast)
  await waitFor(() => expect(toast).not.toHaveAttribute('data-paused'))
  await vi.advanceTimersByTimeAsync(1200)
  await waitFor(() => expect(toast).toHaveAttribute('data-state', 'closed'))
})

test('the action trigger runs the action and dismisses the toast', async () => {
  const log = vi.spyOn(console, 'log').mockImplementation(() => {})
  await setup(Action)
  await user.click(screen.getByRole('button', { name: 'Create event' }))
  const toast = await screen.findByRole('status')

  await user.click(within(toast).getByRole('button', { name: 'Undo' }))

  expect(log).toHaveBeenCalledWith('Undo')
  await waitFor(() => expect(toast).toHaveAttribute('data-state', 'closed'))
})

test('only max toasts show at once and queued ones appear as others leave', async () => {
  await setup(MaxToasts)

  await user.click(screen.getByRole('button', { name: 'Add 5 notifications' }))

  await waitFor(() => expect(toasts()).toHaveLength(3))
  expect(screen.queryByText('Your post was shared 10 times')).not.toBeInTheDocument()

  await user.click(
    within(screen.getByRole('status', { name: 'Notification', description: 'John liked your post' })).getByRole(
      'button',
      { name: 'Dismiss notification' },
    ),
  )

  await vi.advanceTimersByTimeAsync(500)
  await waitFor(() => expect(screen.getByText('Your post was shared 10 times')).toBeInTheDocument())
  expect(visibleToasts()).toHaveLength(3)
})

test('updating a toast replaces its content and type', async () => {
  await setup(Update)
  await user.click(screen.getByRole('button', { name: 'Send message' }))
  const toast = await screen.findByRole('status', { name: 'Sending message...' })
  expect(toast).toHaveAttribute('data-type', 'loading')

  await user.click(screen.getByRole('button', { name: 'Mark as sent' }))

  await waitFor(() => expect(toast).toHaveAccessibleName('Message sent'))
  expect(toast).toHaveAttribute('data-type', 'success')
  expect(within(toast).getByText('Your message has been delivered successfully.')).toBeVisible()
  expect(screen.getAllByRole('status')).toHaveLength(1)
})

test('a promise toast shows loading and then the resolved state', async () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.9)
  await setup(PromiseToast)
  await user.click(screen.getByRole('button', { name: 'Upload file' }))
  const toast = await screen.findByRole('status', { name: 'Uploading file...' })
  expect(toast).toHaveAttribute('data-type', 'loading')

  await vi.advanceTimersByTimeAsync(2000)

  await waitFor(() => expect(toast).toHaveAccessibleName('Upload complete'))
  expect(toast).toHaveAttribute('data-type', 'success')
})

test('a promise toast shows the error state when the promise rejects', async () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.1)
  await setup(PromiseToast)
  await user.click(screen.getByRole('button', { name: 'Upload file' }))
  const toast = await screen.findByRole('status', { name: 'Uploading file...' })

  await vi.advanceTimersByTimeAsync(2000)

  await waitFor(() => expect(toast).toHaveAccessibleName('Upload failed'))
  expect(toast).toHaveAttribute('data-type', 'error')
})

test('the region and its toasts carry the store placement', async () => {
  const toaster = await setup(Placement)
  expect(screen.getByRole('region')).toBe(toaster)
  expect(toaster).toHaveAttribute('data-placement', 'top-end')
  expect(toaster).toHaveAccessibleName(expect.stringContaining('top-end'))

  await user.click(screen.getByRole('button', { name: 'Show toast (top-end)' }))

  const toast = await screen.findByRole('status')
  expect(toast).toHaveAttribute('data-placement', 'top-end')
  expect(toast).toHaveAttribute('data-side', 'top')
  expect(toast).toHaveAttribute('data-align', 'end')
})
