import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Events } from '../examples/events.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

afterEach(() => {
  document.body.innerHTML = ''
})

const content = () => document.querySelector<HTMLElement>('ark-tour-content')!

test('tour starts on its first step and fills the title, description and actions', async () => {
  mount(Basic)
  expect(content()).not.toBeVisible()
  await user.click(document.querySelector<HTMLElement>('[data-start]')!)
  await waitFor(() => expect(content()).toBeVisible())
  expect(document.querySelector('ark-tour-title')).toHaveTextContent('Welcome to the App!')
  expect(document.querySelector('ark-tour-progress-text')).toHaveTextContent('1 of 5')
  expect(within(content()).getByRole('button', { name: 'Start Tour' })).toHaveAttribute('data-tour-action-trigger')
})

test('tour actions move between steps and dismiss closes it', async () => {
  mount(Basic)
  const tour = document.querySelector('ark-tour')!
  await user.click(document.querySelector<HTMLElement>('[data-start]')!)
  await waitFor(() => expect(content()).toBeVisible())
  await user.click(within(content()).getByRole('button', { name: 'Start Tour' }))
  await waitFor(() => expect(document.querySelector('ark-tour-title')).toHaveTextContent('Upload Files'))
  expect(tour.stepId).toBe('upload')
  await user.click(screen.getByRole('button', { name: 'Back' }))
  await waitFor(() => expect(document.querySelector('ark-tour-title')).toHaveTextContent('Welcome to the App!'))
  tour.stepId = 'complete'
  await waitFor(() => expect(document.querySelector('ark-tour-title')).toHaveTextContent("You're all set!"))
  await user.click(screen.getByRole('button', { name: 'Finish' }))
  await waitFor(() => expect(content()).not.toBeVisible())
})

test('tour emits step and status events', async () => {
  mount(Events)
  await user.click(document.querySelector<HTMLElement>('[data-start]')!)
  await waitFor(() => expect(screen.getAllByText(/Step changed:/).length).toBeGreaterThan(0))
  expect(screen.getByText(/Status: started/)).toBeInTheDocument()
})

test('tour keeps authored title text', async () => {
  mount(Basic)
  const title = document.querySelector('ark-tour-title')!
  title.remove()
  const custom = document.createElement('ark-tour-title')
  custom.textContent = 'Custom heading'
  document.querySelector('ark-tour-content')!.append(custom)
  await user.click(document.querySelector<HTMLElement>('[data-start]')!)
  await waitFor(() => expect(content()).toBeVisible())
  expect(custom).toHaveTextContent('Custom heading')
})

test('tour methods start and move between steps', async () => {
  mount(Basic)
  const tour = document.querySelector('ark-tour')!
  tour.start()
  await waitFor(() => expect(content()).toBeVisible())
  tour.next()
  await waitFor(() => expect(tour.stepId).toBe('upload'))
  tour.previous()
  await waitFor(() => expect(document.querySelector('ark-tour-title')).toHaveTextContent('Welcome to the App!'))
})
