import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as AsyncStep } from '../examples/async-step.js'
import { mount as Events } from '../examples/events.js'
import { mount as KeyboardNavigation } from '../examples/keyboard-navigation.js'
import { mount as MixedTypes } from '../examples/mixed-types.js'
import { mount as WaitForClick } from '../examples/wait-for-click.js'
import { mount as WaitForElement } from '../examples/wait-for-element.js'
import { mount as WaitForInput } from '../examples/wait-for-input.js'
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

const title = () => document.querySelector('ark-tour-title')!
const start = async (action?: string) => {
  await user.click(document.querySelector<HTMLElement>('[data-start]')!)
  await waitFor(() => expect(content()).toBeVisible())
  if (action) await user.click(within(content()).getByRole('button', { name: action }))
}

test('tour waits for a click on the target before moving on', async () => {
  mount(WaitForClick)
  await start('Begin')
  await waitFor(() => expect(title()).toHaveTextContent('Click the Add Button'))
  await user.click(screen.getByRole('button', { name: 'Add Item' }))
  await waitFor(() => expect(title()).toHaveTextContent('Click the Edit Button'))
})

test('tour waits for valid input before moving on', async () => {
  mount(WaitForInput)
  await start('Start')
  await waitFor(() => expect(title()).toHaveTextContent('Enter Your Name'))
  await user.type(screen.getByLabelText('Name'), 'A')
  expect(title()).toHaveTextContent('Enter Your Name')
  await user.type(screen.getByLabelText('Name'), 'da')
  await waitFor(() => expect(title()).toHaveTextContent('Enter Your Email'))
})

test('tour waits for an element to appear', async () => {
  mount(WaitForElement)
  await start('Start')
  await waitFor(() => expect(title()).toHaveTextContent('Add an Item'))
  await user.click(screen.getByRole('button', { name: /Add Item/ }))
  await waitFor(() => expect(title()).toHaveTextContent('New Item Added!'))
  expect(document.querySelector('[data-item="new"]')).toHaveTextContent('Item 3')
})

test('tour shows dialog, tooltip and floating steps', async () => {
  mount(MixedTypes)
  const tour = document.querySelector('ark-tour')!
  await start('Start Tour')
  await user.click(within(content()).getByRole('button', { name: 'Next' }))
  await waitFor(() => expect(tour.stepId).toBe('floating-step'))
  expect(title()).toHaveTextContent('Floating Step')
})

test('tour moves between steps with the arrow keys', async () => {
  mount(KeyboardNavigation)
  const tour = document.querySelector('ark-tour')!
  await start()
  await waitFor(() => expect(tour.stepId).toBe('step-1'))
  await user.keyboard('{ArrowRight}')
  await waitFor(() => expect(tour.stepId).toBe('step-2'))
  await user.keyboard('{ArrowLeft}')
  await waitFor(() => expect(tour.stepId).toBe('step-1'))
})

test('tour updates a step with data loaded before showing it', async () => {
  const fetch = vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue(new Response(JSON.stringify({ name: 'Ada', public_repos: 3, followers: 7 })))
  try {
    mount(AsyncStep)
    await start('Next')
    await waitFor(() => expect(title()).toHaveTextContent('Welcome, Ada!'))
    expect(document.querySelector('ark-tour-description')).toHaveTextContent('3 public repositories and 7 followers')
  } finally {
    fetch.mockRestore()
  }
})
