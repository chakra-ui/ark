import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Disabled } from '../examples/disabled.js'
import { mount as Orientation } from '../examples/orientation.js'
import { mount as WithFieldset } from '../examples/with-fieldset.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const radio = (name: string) => screen.getByRole('radio', { name })

const group = () => document.querySelector('ark-radio-group')!

const item = (value: string) => document.querySelector(`ark-radio-group-item[value=${value}] label`)!

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

test('the group is labelled and starts with the default value checked', async () => {
  mount(Basic)

  await waitFor(() => expect(radio('React')).toBeChecked())
  expect(screen.getByRole('radiogroup', { name: 'Framework' })).toBe(group())
  expect(group()).toHaveAttribute('aria-orientation', 'vertical')
  expect(item('React')).toHaveAttribute('data-state', 'checked')
  expect(radio('Solid')).not.toBeChecked()
})

test('clicking an item checks it and unchecks the previous one', async () => {
  mount(Basic)
  await waitFor(() => expect(radio('React')).toBeChecked())

  await user.click(screen.getByText('Vue', { exact: true }))

  await waitFor(() => expect(radio('Vue')).toBeChecked())
  expect(radio('React')).not.toBeChecked()
  expect(item('Vue')).toHaveAttribute('data-state', 'checked')
  expect(item('React')).toHaveAttribute('data-state', 'unchecked')
})

test('clicking the group label focuses the checked radio', async () => {
  mount(Basic)
  await waitFor(() => expect(radio('React')).toBeChecked())

  await user.click(screen.getByText('Framework'))

  await waitFor(() => expect(radio('React')).toHaveFocus())
})

test('arrow keys move the selection and skip a disabled item', async () => {
  mount(Disabled)
  await waitFor(() => expect(radio('Solid')).toBeDisabled())
  await user.tab()
  expect(radio('React')).toHaveFocus()

  await user.keyboard('{ArrowDown}')

  await waitFor(() => expect(radio('Vue')).toBeChecked())
  expect(radio('Vue')).toHaveFocus()

  await user.keyboard('{ArrowUp}')

  await waitFor(() => expect(radio('React')).toBeChecked())
})

test('a disabled item cannot be checked', async () => {
  mount(Disabled)
  await waitFor(() => expect(radio('Solid')).toBeDisabled())
  expect(item('Solid')).toHaveAttribute('data-disabled', '')

  await user.click(screen.getByText('Solid', { exact: true }))
  await settle()

  expect(radio('Solid')).not.toBeChecked()
  expect(radio('React')).toBeChecked()
})

test('disabled and readonly set on the group after mount stop changes', async () => {
  mount(Basic)
  await waitFor(() => expect(radio('React')).toBeChecked())

  group().setAttribute('readonly', '')
  await waitFor(() => expect(group()).toHaveAttribute('aria-readonly', 'true'))

  await user.click(screen.getByText('Solid', { exact: true }))
  await settle()
  expect(radio('Solid')).not.toBeChecked()
  expect(item('Solid')).toHaveAttribute('data-state', 'unchecked')
  expect(item('React')).toHaveAttribute('data-state', 'checked')

  group().removeAttribute('readonly')
  group().setAttribute('disabled', '')

  await waitFor(() => expect(group()).toHaveAttribute('aria-disabled', 'true'))
  for (const name of ['React', 'Solid', 'Vue']) expect(radio(name)).toBeDisabled()
})

test('a controlled group reports the change through valuechange and follows its value attribute', async () => {
  mount(Controlled)
  await waitFor(() => expect(document.querySelectorAll('input[type=radio]')).toHaveLength(3))
  expect(document.querySelector('input:checked')).toBeNull()

  await user.click(screen.getByText('Solid', { exact: true }))

  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('value: Solid'))
  expect(radio('Solid')).toBeChecked()

  group().setAttribute('value', 'Vue')

  await waitFor(() => expect(radio('Vue')).toBeChecked())
  expect(radio('Solid')).not.toBeChecked()

  group().setAttribute('value', '')

  await waitFor(() => expect(item('Vue')).toHaveAttribute('data-state', 'unchecked'))
})

test('orientation and an inherited rtl direction reach the group and its items', async () => {
  mount((root) => {
    root.dir = 'rtl'
    Orientation(root)
  })

  await waitFor(() => expect(group()).toHaveAttribute('dir', 'rtl'))
  expect(group()).toHaveAttribute('aria-orientation', 'horizontal')
  expect(item('React')).toHaveAttribute('dir', 'rtl')
  expect(item('React')).toHaveAttribute('data-orientation', 'horizontal')
})

test('a radio group inside a fieldset is selectable and disabled with the fieldset', async () => {
  mount(WithFieldset)
  expect(await screen.findByRole('group', { name: 'Select a framework' })).toBeVisible()
  await waitFor(() => expect(document.querySelectorAll('input[type=radio]')).toHaveLength(3))

  await user.click(screen.getByText('Solid', { exact: true }))

  await waitFor(() => expect(radio('Solid')).toBeChecked())

  document.querySelector('ark-fieldset')!.setAttribute('disabled', '')

  await waitFor(() => expect(document.querySelector('fieldset')).toHaveAttribute('disabled'))
  for (const name of ['React', 'Solid', 'Vue']) expect(radio(name)).toBeDisabled()
})

test('a radio group in a fieldset is named by the legend and takes its invalid and disabled state', async () => {
  mount(WithFieldset)
  const fieldset = document.querySelector('ark-fieldset')!
  await fieldset.ready
  const current = group()
  const parent = current.parentElement!
  current.remove()
  parent.append(current)
  await current.ready

  await waitFor(() => expect(screen.getByRole('radiogroup', { name: 'Select a framework' })).toBe(group()))

  fieldset.setAttribute('invalid', '')
  await waitFor(() => expect(group()).toHaveAttribute('data-invalid', ''))

  fieldset.setAttribute('disabled', '')
  await waitFor(() => expect(group()).toHaveAttribute('data-disabled', ''))
})
