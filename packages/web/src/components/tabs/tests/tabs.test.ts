import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as DisabledTab } from '../examples/disabled-tab.js'
import { mount as LazyMount } from '../examples/lazy-mount.js'
import { mount as ManualActivation } from '../examples/manual-activation.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const tab = (name: string) => screen.getByRole('tab', { name })

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

const account = /Make changes to your account/
const password = /Change your password/

test('clicking a tab selects it and shows its content', async () => {
  mount(Basic)
  await waitFor(() => expect(tab('Account')).toHaveAttribute('aria-selected', 'true'))
  expect(screen.getByText(account)).toBeVisible()
  expect(screen.getByText(password)).not.toBeVisible()

  await user.click(tab('Password'))

  await waitFor(() => expect(tab('Password')).toHaveAttribute('aria-selected', 'true'))
  expect(tab('Account')).toHaveAttribute('aria-selected', 'false')
  expect(screen.getByText(password)).toBeVisible()
  expect(screen.getByText(account)).not.toBeVisible()
})

test('arrow keys select the next tab and wrap around by default', async () => {
  mount(Basic)
  await waitFor(() => expect(tab('Account')).toHaveAttribute('aria-selected', 'true'))
  await user.tab()
  expect(tab('Account')).toHaveFocus()

  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(tab('Password')).toHaveAttribute('aria-selected', 'true'))

  await user.keyboard('{End}')
  await waitFor(() => expect(tab('Billing')).toHaveFocus())

  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(tab('Account')).toHaveFocus())
  expect(tab('Account')).toHaveAttribute('aria-selected', 'true')
})

test('arrow keys follow the reading direction in rtl', async () => {
  mount((root) => {
    root.dir = 'rtl'
    Basic(root)
  })
  await waitFor(() => expect(tab('Account')).toHaveAttribute('aria-selected', 'true'))
  await user.tab()

  await user.keyboard('{ArrowLeft}')

  await waitFor(() => expect(tab('Password')).toHaveAttribute('aria-selected', 'true'))
})

test('focus stops at the last tab when loop-focus is false', async () => {
  mount(Basic)
  document.querySelector('ark-tabs')!.setAttribute('loop-focus', 'false')
  await waitFor(() => expect(tab('Account')).toHaveAttribute('aria-selected', 'true'))
  await user.tab()

  await user.keyboard('{End}')
  await waitFor(() => expect(tab('Billing')).toHaveFocus())

  await user.keyboard('{ArrowRight}')
  await settle()
  expect(tab('Billing')).toHaveFocus()
})

test('keyboard navigation skips a disabled tab', async () => {
  mount(DisabledTab)
  await waitFor(() => expect(tab('Password')).toBeDisabled())
  await user.tab()

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(tab('Billing')).toHaveFocus())
  expect(tab('Password')).toHaveAttribute('aria-selected', 'false')
})

test('manual activation moves focus with arrows and selects on Enter', async () => {
  mount(ManualActivation)
  await waitFor(() => expect(tab('Account')).toHaveAttribute('aria-selected', 'true'))
  await user.tab()

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(tab('Password')).toHaveFocus())
  expect(tab('Account')).toHaveAttribute('aria-selected', 'true')

  await user.keyboard('{Enter}')

  await waitFor(() => expect(tab('Password')).toHaveAttribute('aria-selected', 'true'))
})

test('a controlled tabs element reports the selection through valuechange', async () => {
  mount(Controlled)
  const root = document.querySelector('ark-tabs')!
  await waitFor(() => expect(tab('Account')).toHaveAttribute('aria-selected', 'true'))

  await user.click(tab('Billing'))

  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('value: billing'))
  expect(tab('Billing')).toHaveAttribute('aria-selected', 'true')

  root.setAttribute('value', 'password')

  await waitFor(() => expect(tab('Password')).toHaveAttribute('aria-selected', 'true'))
  expect(screen.getByText(password)).toBeVisible()
})

test('unmount-on-exit keeps only the selected content in the DOM', async () => {
  mount(LazyMount)
  await waitFor(() => expect(screen.getByText(account)).toBeVisible())
  expect(screen.queryByText(password)).not.toBeInTheDocument()

  await user.click(tab('Password'))

  await waitFor(() => expect(screen.getByText(password)).toBeVisible())
  await waitFor(() => expect(screen.queryByText(account)).not.toBeInTheDocument())
})
