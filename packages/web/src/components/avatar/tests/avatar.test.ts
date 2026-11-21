import { screen, waitFor } from '@testing-library/dom'

import { mount as Basic } from '../../../../examples/avatar/basic.js'
import { mount as Events } from '../../../../examples/avatar/events.js'
import { mount } from '../../../test-utils.js'

const image = () => document.querySelector('img')!

const output = () => document.querySelector('output')!

test('avatar shows the fallback until the image loads', async () => {
  mount(Basic)
  const avatar = document.querySelector('ark-avatar')!

  await waitFor(() => expect(avatar).toHaveAttribute('data-status', 'loading'))
  expect(screen.getByText('PA', { exact: true })).toBeVisible()
  expect(image()).not.toBeVisible()

  image().dispatchEvent(new Event('load'))
  await waitFor(() => expect(avatar).toHaveAttribute('data-status', 'loaded'))
  expect(image()).toBeVisible()
  expect(image()).toHaveAttribute('data-state', 'visible')
  expect(screen.getByText('PA', { exact: true })).not.toBeVisible()
})

test('avatar keeps the fallback when the image fails', async () => {
  mount(Events)
  await waitFor(() => expect(document.querySelector('ark-avatar')).toHaveAttribute('data-status', 'loading'))

  image().dispatchEvent(new Event('error'))
  await waitFor(() => expect(output()).toHaveTextContent('Status: error'))
  expect(document.querySelector('ark-avatar')).toHaveAttribute('data-status', 'error')
  expect(screen.getByText('PA', { exact: true })).toBeVisible()
  expect(image()).not.toBeVisible()
})

test('avatar dispatches statuschange and resets when the source changes', async () => {
  mount(Events)
  await waitFor(() => expect(output()).toHaveTextContent('Status: loading'))

  image().dispatchEvent(new Event('load'))
  await waitFor(() => expect(output()).toHaveTextContent('Status: loaded'))

  Object.defineProperty(image(), 'complete', { configurable: true, value: false })
  image().setAttribute('src', 'https://i.pravatar.cc/3000?u=b')
  await waitFor(() => expect(output()).toHaveTextContent('Status: loading'))
  expect(screen.getByText('PA', { exact: true })).toBeVisible()

  image().dispatchEvent(new Event('load'))
  await waitFor(() => expect(output()).toHaveTextContent('Status: loaded'))
})
