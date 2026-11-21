import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Fade } from '../../../../examples/swap/fade.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

afterEach(() => {
  document.body.innerHTML = ''
})

const indicator = (type: 'on' | 'off') => document.querySelector(`ark-swap-indicator[type=${type}]`)!

test('swap shows the off indicator first', async () => {
  mount(Fade)
  const swap = document.querySelector('ark-swap')!
  await waitFor(() => expect(swap).toHaveAttribute('data-swap', 'off'))
  await waitFor(() => expect(indicator('off')).toBeVisible())
  expect(indicator('on')).not.toBeVisible()
  expect(indicator('on')).toHaveAttribute('data-type', 'on')
})

test('swap switches indicators when the swap attribute toggles', async () => {
  mount(Fade)
  const swap = document.querySelector('ark-swap')!
  await user.click(screen.getByRole('button', { name: 'Toggle' }))
  await waitFor(() => expect(swap).toHaveAttribute('data-swap', 'on'))
  await waitFor(() => expect(indicator('on')).toHaveAttribute('data-state', 'open'))
  await waitFor(() => expect(indicator('on')).toBeVisible())
  await waitFor(() => expect(indicator('off')).not.toBeVisible())
  await user.click(screen.getByRole('button', { name: 'Toggle' }))
  await waitFor(() => expect(swap).toHaveAttribute('data-swap', 'off'))
  await waitFor(() => expect(indicator('off')).toBeVisible())
})
