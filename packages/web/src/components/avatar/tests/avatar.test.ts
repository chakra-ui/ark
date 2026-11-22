import { screen, waitFor } from '@testing-library/dom'

import { mount as Basic } from '../examples/basic.js'
import { mount as Events } from '../examples/events.js'
import { mount } from '../../../test-utils.js'

const avatar = () => document.querySelector('ark-avatar')

const image = () => document.querySelector('img')!

const fallback = () => screen.getByText('PA', { exact: true })

const status = () => document.querySelector('output')

const changeSource = (src: string) => {
  Object.defineProperty(image(), 'complete', { configurable: true, value: false })
  image().setAttribute('src', src)
}

test('the fallback shows until the image loads', async () => {
  mount(Basic)

  await waitFor(() => expect(avatar()).toHaveAttribute('data-status', 'loading'))
  expect(fallback()).toBeVisible()
  expect(image()).not.toBeVisible()

  image().dispatchEvent(new Event('load'))

  await waitFor(() => expect(avatar()).toHaveAttribute('data-status', 'loaded'))
  expect(image()).toBeVisible()
  expect(image()).toHaveAttribute('data-state', 'visible')
  expect(fallback()).not.toBeVisible()
})

test('the fallback stays when the image fails to load', async () => {
  mount(Events)
  await waitFor(() => expect(avatar()).toHaveAttribute('data-status', 'loading'))

  image().dispatchEvent(new Event('error'))

  await waitFor(() => expect(status()).toHaveTextContent('Status: error'))
  expect(avatar()).toHaveAttribute('data-status', 'error')
  expect(fallback()).toBeVisible()
  expect(image()).not.toBeVisible()
})

test('changing the image source goes back to loading and reports each status', async () => {
  mount(Events)
  await waitFor(() => expect(status()).toHaveTextContent('Status: loading'))

  image().dispatchEvent(new Event('load'))

  await waitFor(() => expect(status()).toHaveTextContent('Status: loaded'))

  changeSource('https://i.pravatar.cc/3000?u=b')

  await waitFor(() => expect(status()).toHaveTextContent('Status: loading'))
  expect(fallback()).toBeVisible()

  image().dispatchEvent(new Event('load'))

  await waitFor(() => expect(status()).toHaveTextContent('Status: loaded'))
})
