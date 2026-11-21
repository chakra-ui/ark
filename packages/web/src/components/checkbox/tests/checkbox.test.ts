import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Controlled } from '../../../../examples/checkbox/controlled.js'
import { mount as GroupWithForm } from '../../../../examples/checkbox/group-with-form.js'
import { mount as GroupWithMaxSelected } from '../../../../examples/checkbox/group-with-max-selected.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

test('checkbox group enforces its maximum and submits native form values', async () => {
  const root = mount(GroupWithMaxSelected)
  const inputs = () => document.querySelectorAll<HTMLInputElement>('input[type=checkbox]')

  await waitFor(() => expect(inputs()).toHaveLength(4))
  await waitFor(() => expect(inputs()[0]).toBeChecked())

  await user.click(screen.getByText('Solid', { exact: true }))
  await waitFor(() => expect(inputs()[1]).toBeChecked())
  await waitFor(() => expect(inputs()[2]).toBeDisabled())

  await user.click(screen.getByText('React', { exact: true }))
  await waitFor(() => expect(inputs()[2]).toBeEnabled())

  root.remove()
  mount(GroupWithForm)

  await user.click(await screen.findByText('Solid', { exact: true }))
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('["react","solid"]'))
})

test('controlled checkbox can disconnect and reconnect without duplicate events', async () => {
  mount(Controlled)
  const input = document.querySelector<HTMLInputElement>('input[type=checkbox]')!

  await waitFor(() => expect(input).toBeChecked())

  const el = document.querySelector('ark-checkbox')!
  const parent = el.parentElement!
  let changes = 0
  el.addEventListener('checkedchange', () => el.setAttribute('data-changes', String(++changes)))

  for (let i = 0; i < 3; i++) {
    el.remove()
    parent.append(el)
    await new Promise(requestAnimationFrame)
  }

  await user.click(screen.getByText('Checkbox', { exact: true }))
  await waitFor(() => expect(input).not.toBeChecked())
  expect(el).toHaveAttribute('data-changes', '1')
  expect(document.querySelector('output')).toHaveTextContent('checked: false')
})
