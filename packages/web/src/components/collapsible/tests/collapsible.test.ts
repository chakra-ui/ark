import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Disabled } from '../examples/disabled.js'
import { mount as HideMode } from '../examples/hide-mode.js'
import { mount as InitialOpen } from '../examples/initial-open.js'
import { mount as LazyMount } from '../examples/lazy-mount.js'
import { mount as Nested } from '../examples/nested.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const trigger = (name = 'What is Ark UI?') => screen.getByRole('button', { name })

const content = () => document.querySelector('ark-collapsible-content')!

const body = /headless component library/

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

test('clicking the trigger opens the content and clicking it again closes it', async () => {
  mount(Basic)
  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))
  expect(trigger()).toHaveAttribute('aria-controls', content().id)
  expect(screen.getByText(body)).not.toBeVisible()

  await user.click(trigger())

  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'true'))
  expect(screen.getByText(body)).toBeVisible()
  expect(document.querySelector('ark-collapsible-indicator')).toHaveAttribute('data-state', 'open')

  await user.click(trigger())

  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))
  expect(screen.getByText(body)).not.toBeVisible()
})

test('Enter and Space on the focused trigger toggle the content', async () => {
  mount(Basic)
  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))
  await user.tab()
  expect(trigger()).toHaveFocus()

  await user.keyboard('{Enter}')
  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'true'))

  await user.keyboard(' ')
  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))
})

test('default-open starts with the content shown', async () => {
  mount(InitialOpen)

  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'true'))
  expect(screen.getByText(body)).toBeVisible()
})

test('a disabled collapsible does not open', async () => {
  mount(Disabled)
  await waitFor(() => expect(trigger()).toBeDisabled())
  expect(document.querySelector('ark-collapsible')).toHaveAttribute('data-disabled')

  await user.click(trigger())
  await settle()

  expect(trigger()).toHaveAttribute('aria-expanded', 'false')
  expect(screen.getByText(body)).not.toBeVisible()
})

test('the disabled attribute set after mount stops the trigger', async () => {
  mount(Basic)
  await waitFor(() => expect(trigger()).toBeEnabled())

  document.querySelector('ark-collapsible')!.setAttribute('disabled', '')

  await waitFor(() => expect(trigger()).toBeDisabled())
})

test('openchange reports the new state and the open attribute and property drive it', async () => {
  mount(Basic)
  const root = document.querySelector('ark-collapsible')!
  const changed = vi.fn()
  root.addEventListener('openchange', (event) => changed((event as CustomEvent).detail.open))
  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))

  await user.click(trigger())

  await waitFor(() => expect(changed).toHaveBeenCalledWith(true))

  await user.click(trigger())
  await waitFor(() => expect(changed).toHaveBeenLastCalledWith(false))

  root.setAttribute('open', '')

  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'true'))
  expect(screen.getByText(body)).toBeVisible()

  root.removeAttribute('open')
  ;(root as HTMLElement & { open: boolean }).open = false

  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))
})

test('unmount-on-exit mounts the content when it opens and removes it when it closes', async () => {
  mount(LazyMount)
  await waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))
  expect(screen.queryByText(body)).not.toBeInTheDocument()

  await user.click(trigger())

  await waitFor(() => expect(screen.getByText(body)).toBeVisible())

  await user.click(trigger())

  await waitFor(() => expect(screen.queryByText(body)).not.toBeInTheDocument())
})

test('hidden-until-found closes to hidden=until-found so find-in-page can reveal it', async () => {
  mount(HideMode)
  await waitFor(() => expect(trigger('hidden')).toHaveAttribute('aria-expanded', 'true'))

  await user.click(trigger('hidden'))
  await user.click(trigger('hidden-until-found'))

  const [plain, untilFound] = document.querySelectorAll('ark-collapsible-content')
  await waitFor(() => expect(untilFound).toHaveAttribute('hidden', 'until-found'))
  expect(plain).toHaveAttribute('hidden', '')
})

test('a nested collapsible opens independently of its parent', async () => {
  mount(Nested)
  await waitFor(() => expect(trigger('Getting Started')).toHaveAttribute('aria-expanded', 'false'))

  await user.click(trigger('Getting Started'))

  await waitFor(() => expect(trigger('Installation')).toBeVisible())
  expect(trigger('Installation')).toHaveAttribute('aria-expanded', 'false')
  expect(screen.getByText(/preferred package manager/)).not.toBeVisible()

  await user.click(trigger('Installation'))

  await waitFor(() => expect(screen.getByText(/preferred package manager/)).toBeVisible())
  expect(trigger('Styling')).toHaveAttribute('aria-expanded', 'false')

  await user.click(trigger('Getting Started'))

  await waitFor(() => expect(trigger('Getting Started')).toHaveAttribute('aria-expanded', 'false'))
  expect(screen.getByRole('button', { name: 'Installation', hidden: true })).toHaveAttribute('aria-expanded', 'true')
})
