import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as ControlledSize } from '../examples/controlled-size.js'
import { mount as LazyMount } from '../examples/lazy-mount.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

afterEach(() => {
  document.body.innerHTML = ''
})

const content = () => document.querySelector('ark-floating-panel-content')!

test('floating panel opens from its trigger and closes from its close trigger', async () => {
  mount(Basic)
  const trigger = await screen.findByRole('button', { name: 'Toggle Panel' })
  await waitFor(() => expect(trigger).toHaveAttribute('data-state', 'closed'))
  expect(content()).not.toBeVisible()
  await user.click(trigger)
  await waitFor(() => expect(trigger).toHaveAttribute('data-state', 'open'))
  await waitFor(() => expect(content()).toBeVisible())
  expect(document.querySelector('ark-floating-panel')!.open).toBe(true)
  await user.click(screen.getByRole('button', { name: 'Close Window' }))
  await waitFor(() => expect(trigger).toHaveAttribute('data-state', 'closed'))
})

test('floating panel stage triggers change the stage', async () => {
  mount(Basic)
  const panel = document.querySelector('ark-floating-panel')!
  const stages: string[] = []
  panel.addEventListener('stagechange', (event) => stages.push(event.detail.stage))
  await user.click(await screen.findByRole('button', { name: 'Toggle Panel' }))
  await waitFor(() => expect(content()).toBeVisible())
  await user.click(screen.getByRole('button', { name: 'Maximize window' }))
  await waitFor(() => expect(stages).toContain('maximized'))
  expect(content()).toHaveAttribute('data-maximized')
  await user.click(screen.getByRole('button', { name: 'Restore window' }))
  await waitFor(() => expect(stages.at(-1)).toBe('default'))
})

test('floating panel methods change the stage', async () => {
  mount(Basic)
  const panel = document.querySelector('ark-floating-panel')!
  panel.open = true
  await waitFor(() => expect(content()).toBeVisible())
  panel.maximize()
  await waitFor(() => expect(content()).toHaveAttribute('data-maximized'))
  panel.restore()
  await waitFor(() => expect(content()).not.toHaveAttribute('data-maximized'))
  panel.minimize()
  await waitFor(() => expect(content()).toHaveAttribute('data-minimized'))
})

test('floating panel mounts lazy content only while open', async () => {
  mount(LazyMount)
  await screen.findByRole('button', { name: 'Toggle Panel' })
  expect(screen.queryByText('Mounted on open')).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Toggle Panel' }))
  await waitFor(() => expect(screen.getByText('Mounted on open')).toBeInTheDocument())
})

test('floating panel takes its size from the size property', async () => {
  mount(ControlledSize)
  await user.click(await screen.findByRole('button', { name: 'Toggle Panel' }))
  const positioner = document.querySelector('ark-floating-panel-positioner')!
  await waitFor(() => expect(positioner.getAttribute('style')).toContain('--width: 400px'))
  expect(positioner.getAttribute('style')).toContain('--height: 300px')
})
