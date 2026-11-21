import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/navigation-menu/basic.js'
import { mount as Controlled } from '../../../../examples/navigation-menu/controlled.js'
import { mount as Viewport } from '../../../../examples/navigation-menu/viewport.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

afterEach(() => {
  document.body.innerHTML = ''
})

const content = (value: string) =>
  Array.from(document.querySelectorAll('ark-navigation-menu-content')).find((el) =>
    el.querySelector(`a[href="${value}"]`),
  )!

test('navigation menu opens an item content from its trigger', async () => {
  mount(Basic)
  const trigger = await screen.findByRole('button', { name: 'Overview' })
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'))
  expect(content('#quick-start')).not.toBeVisible()
  await user.click(trigger)
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'))
  await waitFor(() => expect(content('#quick-start')).toBeVisible())
  expect(trigger.getAttribute('aria-controls')).toBe(content('#quick-start').id)
  await user.click(trigger)
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'))
})

test('navigation menu emits valuechange and exposes value as a property', async () => {
  mount(Controlled)
  const menu = document.querySelector('ark-navigation-menu')!
  await user.click(await screen.findByRole('button', { name: 'Guides' }))
  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('Open: guides'))
  expect(menu.value).toBe('guides')
  menu.value = 'overview'
  await waitFor(() => expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute('aria-expanded', 'true'))
})

test('navigation menu moves content into the viewport and keeps its item value', async () => {
  mount(Viewport)
  const viewport = document.querySelector('ark-navigation-menu-viewport')!
  await user.click(await screen.findByRole('button', { name: 'Overview' }))
  await waitFor(() => expect(viewport.contains(content('#quick-start'))).toBe(true))
  await waitFor(() => expect(content('#quick-start')).toBeVisible())
  expect(document.querySelector('ark-navigation-menu-item[value=overview] [data-trigger-proxy]')).toBeInTheDocument()
  expect(content('#quick-start').querySelector('a')).toHaveAttribute('data-navigation-menu-link')
})
