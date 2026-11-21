import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/steps/basic.js'
import { mount as Controlled } from '../../../../examples/steps/controlled.js'
import { mount as Vertical } from '../../../../examples/steps/vertical.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const firstStep = () => screen.getByText('First - Contact Info')

test('next and back move between steps and report the current step', async () => {
  mount(Controlled)
  const steps = document.querySelector('ark-steps')!
  const output = document.querySelector('output')!
  await waitFor(() => expect(firstStep()).toBeVisible())

  await user.click(screen.getByRole('button', { name: 'Next' }))

  await waitFor(() => expect(output).toHaveTextContent('current step: second'))
  expect(steps).toHaveAttribute('value', 'second')
  await waitFor(() => expect(screen.getByText('Second - Date & Time')).toBeVisible())
  expect(firstStep()).not.toBeVisible()

  await user.click(screen.getByRole('button', { name: 'Back' }))

  await waitFor(() => expect(output).toHaveTextContent('current step: first'))
  await waitFor(() => expect(firstStep()).toBeVisible())
})

test('clicking a step trigger jumps to that step', async () => {
  mount(Basic)
  await waitFor(() => expect(screen.getByRole('tab', { name: 'Third' })).toBeInstanceOf(HTMLButtonElement))
  const third = screen.getByRole('tab', { name: 'Third' })

  await user.click(third)

  await waitFor(() => expect(third).toHaveAttribute('aria-selected', 'true'))
  expect(document.querySelector('ark-steps-item[value=third]')).toHaveAttribute('data-current', '')
  await waitFor(() => expect(screen.getByText('Third - Select Rooms')).toBeVisible())
})

test('the completed content shows after the last step', async () => {
  mount(Basic)
  const next = await screen.findByRole('button', { name: 'Next' })
  const completed = screen.getByText('Steps Complete - Thank you for filling out the form!')
  await waitFor(() => expect(completed).not.toBeVisible())

  for (let i = 0; i < 3; i++) await user.click(next)

  await waitFor(() => expect(completed).toBeVisible())
  expect(next).toBeDisabled()
  expect(document.querySelector('ark-steps')).toHaveAttribute('data-complete', '')
  expect(document.querySelectorAll('ark-steps-indicator[data-complete]')).toHaveLength(3)
})

test('vertical steps mark their parts with the vertical orientation', async () => {
  mount(Vertical)

  await waitFor(() => expect(document.querySelector('ark-steps')).toHaveAttribute('data-orientation', 'vertical'))
  expect(document.querySelector('ark-steps-list')).toHaveAttribute('aria-orientation', 'vertical')
  expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('data-orientation', 'vertical')
})
