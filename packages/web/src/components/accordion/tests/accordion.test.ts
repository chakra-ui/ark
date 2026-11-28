import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Collapsible } from '../examples/collapsible.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Disabled } from '../examples/disabled.js'
import { mount as LazyMount } from '../examples/lazy-mount.js'
import { mount as Multiple } from '../examples/multiple.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const trigger = (name: string) => screen.getByRole('button', { name })

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

const first = 'What is Ark UI?'
const second = 'How to get started?'
const third = 'Who maintains this project?'

test('opens the item named in default-value and keeps the others closed', async () => {
  mount(Basic)

  await waitFor(() => expect(trigger(first)).toHaveAttribute('aria-expanded', 'true'))
  expect(trigger(second)).toHaveAttribute('aria-expanded', 'false')
  expect(screen.getByText(/headless component library/)).toBeVisible()
  expect(screen.getByText(/Install the package/)).not.toBeVisible()
})

test('opening an item closes the open one and the open item stays open when clicked again', async () => {
  mount(Basic)
  await waitFor(() => expect(trigger(first)).toHaveAttribute('aria-expanded', 'true'))

  await user.click(trigger(second))

  await waitFor(() => expect(trigger(second)).toHaveAttribute('aria-expanded', 'true'))
  expect(trigger(first)).toHaveAttribute('aria-expanded', 'false')

  await user.click(trigger(second))
  await settle()

  expect(trigger(second)).toHaveAttribute('aria-expanded', 'true')
})

test('a collapsible accordion closes the open item when it is clicked', async () => {
  mount(Collapsible)
  await waitFor(() => expect(trigger(first)).toHaveAttribute('aria-expanded', 'true'))

  await user.click(trigger(first))

  await waitFor(() => expect(trigger(first)).toHaveAttribute('aria-expanded', 'false'))
})

test('a multiple accordion keeps every opened item open', async () => {
  mount(Multiple)
  await waitFor(() => expect(trigger(first)).toHaveAttribute('aria-expanded', 'true'))

  await user.click(trigger(second))

  await waitFor(() => expect(trigger(second)).toHaveAttribute('aria-expanded', 'true'))
  expect(trigger(first)).toHaveAttribute('aria-expanded', 'true')
})

test('a disabled item does not open', async () => {
  mount(Disabled)
  await waitFor(() => expect(trigger(second)).toBeDisabled())

  await user.click(trigger(second))
  await settle()

  expect(trigger(second)).toHaveAttribute('aria-expanded', 'false')
  expect(trigger(first)).toHaveAttribute('aria-expanded', 'true')
})

test('a controlled accordion reports the opened item through valuechange', async () => {
  mount(Controlled)
  const root = document.querySelector('ark-accordion')!
  await waitFor(() => expect(trigger(first)).toHaveAttribute('aria-expanded', 'false'))

  await user.click(trigger(third))

  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('value: maintainers'))
  expect(trigger(third)).toHaveAttribute('aria-expanded', 'true')

  root.setAttribute('value', 'ark-ui')

  await waitFor(() => expect(trigger(first)).toHaveAttribute('aria-expanded', 'true'))
  expect(trigger(third)).toHaveAttribute('aria-expanded', 'false')
})

test('Tab moves focus between triggers and arrow keys do not', async () => {
  mount(Basic)
  await waitFor(() => expect(trigger(first)).toHaveAttribute('aria-expanded', 'true'))

  await user.tab()
  expect(trigger(first)).toHaveFocus()

  await user.tab()
  expect(trigger(second)).toHaveFocus()

  await user.keyboard('{ArrowDown}')
  await settle()
  expect(trigger(second)).toHaveFocus()
})

test('lazy content mounts when its item opens and unmounts when it closes', async () => {
  mount(LazyMount)
  await waitFor(() => expect(trigger(first)).toHaveAttribute('aria-expanded', 'false'))
  expect(screen.queryByText(/headless component library/)).not.toBeInTheDocument()
  expect(trigger(first)).not.toHaveAttribute('aria-controls')

  await user.click(trigger(first))

  await waitFor(() => expect(screen.getByText(/headless component library/)).toBeVisible())
  await waitFor(() =>
    expect(trigger(first)).toHaveAttribute('aria-controls', document.querySelector('ark-accordion-item-content')!.id),
  )

  await user.click(trigger(first))

  await waitFor(() => expect(screen.queryByText(/headless component library/)).not.toBeInTheDocument())
  expect(trigger(first)).not.toHaveAttribute('aria-controls')
})
