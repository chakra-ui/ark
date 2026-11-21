import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Controlled } from '../../../../examples/checkbox/controlled.js'
import { mount as GroupWithForm } from '../../../../examples/checkbox/group-with-form.js'
import { mount as GroupWithMaxSelected } from '../../../../examples/checkbox/group-with-max-selected.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const inputs = () => document.querySelectorAll<HTMLInputElement>('input[type=checkbox]')

const output = () => document.querySelector('output')

test('a group disables the remaining checkboxes once its maximum is selected', async () => {
  mount(GroupWithMaxSelected)
  await waitFor(() => expect(inputs()).toHaveLength(4))
  await waitFor(() => expect(inputs()[0]).toBeChecked())

  await user.click(screen.getByText('Solid', { exact: true }))

  await waitFor(() => expect(inputs()[1]).toBeChecked())
  await waitFor(() => expect(inputs()[2]).toBeDisabled())

  await user.click(screen.getByText('React', { exact: true }))

  await waitFor(() => expect(inputs()[2]).toBeEnabled())
})

test('a group submits its checked values with the form', async () => {
  mount(GroupWithForm)

  await user.click(await screen.findByText('Solid', { exact: true }))
  await user.click(screen.getByRole('button', { name: 'Submit' }))

  await waitFor(() => expect(output()).toHaveTextContent('["react","solid"]'))
})

test('moving a controlled checkbox around the page does not duplicate its change event', async () => {
  mount(Controlled)
  const input = inputs()[0]
  await waitFor(() => expect(input).toBeChecked())
  const checkbox = document.querySelector('ark-checkbox')!
  const parent = checkbox.parentElement!
  const changed = vi.fn()
  checkbox.addEventListener('checkedchange', changed)

  for (let i = 0; i < 3; i++) {
    checkbox.remove()
    parent.append(checkbox)
    await checkbox.ready
  }
  await user.click(screen.getByText('Checkbox', { exact: true }))

  await waitFor(() => expect(input).not.toBeChecked())
  expect(changed).toHaveBeenCalledTimes(1)
  expect(output()).toHaveTextContent('checked: false')
})
