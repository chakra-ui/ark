import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Checkbox } from '../../components/checkbox/examples/basic.js'
import { mount as Clipboard } from '../../components/clipboard/examples/basic.js'
import { mount as ColorPicker } from '../../components/color-picker/examples/basic.js'
import { mount as NumberInput } from '../../components/number-input/examples/basic.js'
import { mount as PasswordInput } from '../../components/password-input/examples/basic.js'
import { mount as Select } from '../../components/select/examples/basic.js'
import { mount as TagsInput } from '../../components/tags-input/examples/basic.js'
import { mount } from '../../test-utils.js'
import { linkLabel } from '../label.js'

const user = userEvent.setup()

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

test.each([
  ['number input', NumberInput, 'Label', 'ark-number-input-input input'],
  ['password input', PasswordInput, 'Password', 'ark-password-input-input input'],
  ['clipboard', Clipboard, 'Copy this link', 'ark-clipboard-input input'],
  ['tags input', TagsInput, 'Frameworks', 'ark-tags-input-input input'],
])('the %s label names its input and focuses it on click', async (_, example, label, selector) => {
  mount(example)
  const input = document.querySelector<HTMLElement>(selector)!

  await waitFor(() => expect(input).toHaveAccessibleName(label))

  await user.click(screen.getByText(label, { exact: true }))

  await waitFor(() => expect(input).toHaveFocus())
})

test('a label whose click handler prevents the default keeps its own focus target', async () => {
  mount(ColorPicker)
  const hex = await waitFor(() => document.querySelector<HTMLInputElement>('[data-channel=hex]')!)

  await user.click(screen.getByText('Color', { exact: true }))

  await waitFor(() => expect(hex).toHaveFocus())
})

test('a control that already has a name keeps it', async () => {
  mount(Select)
  const trigger = await waitFor(() => document.querySelector<HTMLElement>('ark-select-trigger button')!)
  const labelledBy = await waitFor(() => {
    const value = trigger.getAttribute('aria-labelledby')
    expect(value).toBeTruthy()
    return value
  })

  await settle()

  expect(trigger.getAttribute('aria-labelledby')).toBe(labelledBy)
})

test('a label inside a native label does not activate the control twice', async () => {
  mount(Checkbox)
  const input = await waitFor(() => document.querySelector<HTMLInputElement>('input[type=checkbox]')!)
  await waitFor(() => expect(input).not.toBeChecked())

  await user.click(screen.getByText('Checkbox', { exact: true }))
  await settle()

  expect(input).toBeChecked()
})

test('the label stops naming the input once it is removed', async () => {
  mount(NumberInput)
  const input = document.querySelector<HTMLElement>('ark-number-input-input input')!
  await waitFor(() => expect(input).toHaveAccessibleName('Label'))

  document.querySelector('ark-number-input-label')!.remove()
  await settle()

  expect(input).not.toHaveAttribute('aria-labelledby')
})

const fixture = (html: string) => {
  document.body.innerHTML = html
  return (selector: string) => document.querySelector<HTMLElement>(selector)!
}

test('a label whose for changes stops naming the previous control', () => {
  const $ = fixture('<span id="l" for="a">Name</span><input id="a" /><input id="b" />')
  linkLabel($('#l'))

  $('#l').setAttribute('for', 'b')
  linkLabel($('#l'))

  expect($('#a')).not.toHaveAttribute('aria-labelledby')
  expect($('#b')).toHaveAccessibleName('Name')
})

test('a control keeps its name from a second label when the first goes away', () => {
  const $ = fixture('<span id="one" for="a">First</span><span id="two" for="a">Second</span><input id="a" />')
  const unlinkFirst = linkLabel($('#one'))
  linkLabel($('#two'))
  expect($('#a')).toHaveAccessibleName('First Second')

  unlinkFirst?.()

  expect($('#a')).toHaveAccessibleName('Second')
})

test('a label still focuses its control when an ancestor stops the click', async () => {
  const $ = fixture('<div id="wrap"><span id="l" for="a">Name</span></div><input id="a" />')
  $('#wrap').addEventListener('click', (event) => event.stopPropagation())
  linkLabel($('#l'))

  await user.click($('#l'))

  await waitFor(() => expect($('#a')).toHaveFocus())
})
