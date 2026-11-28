import { waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Controls } from '../examples/controls.js'
import { mount as DoubleClick } from '../examples/double-click.js'
import { mount as Textarea } from '../examples/textarea.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const editable = () => document.querySelector('ark-editable')!

const preview = () => document.querySelector<HTMLElement>('ark-editable-preview')!

const input = () => document.querySelector<HTMLInputElement>('ark-editable-input input')!

const trigger = (name: string) => document.querySelector<HTMLButtonElement>(`ark-editable-${name}-trigger button`)!

const editing = () => waitFor(() => expect(input()).toBeVisible())

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

const start = (example: (root: HTMLElement) => void, attributes: Record<string, string>) =>
  mount((container) => {
    example(container)
    const el = container.querySelector('ark-editable')!
    for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value)
  })

test('the preview shows the default value and the input stays hidden', async () => {
  mount(Basic)

  await waitFor(() => expect(preview()).toHaveTextContent('Hello World'))
  expect(preview()).toHaveAttribute('tabindex', '0')
  expect(input()).not.toBeVisible()
  expect(input()).toHaveValue('Hello World')
  expect(editable()).not.toHaveAttribute('data-focus')
})

test('an empty value shows the placeholder in the preview', async () => {
  start(Basic, { 'default-value': '' })

  await waitFor(() => expect(preview()).toHaveTextContent('Enter text...'))
  expect(preview()).toHaveAttribute('data-placeholder-shown', '')
  expect(input()).toHaveAttribute('placeholder', 'Enter text...')
})

test('focusing the preview starts editing and Enter commits the typed value', async () => {
  mount(Basic)
  const committed = vi.fn()
  editable().addEventListener('valuecommit', (event) => committed((event as CustomEvent).detail.value))
  await waitFor(() => expect(preview()).toHaveTextContent('Hello World'))

  await user.tab()

  await editing()
  expect(preview()).not.toBeVisible()
  expect(editable()).toHaveAttribute('data-focus', '')

  await user.clear(input())
  await user.type(input(), 'Ark UI{Enter}')

  await waitFor(() => expect(input()).not.toBeVisible())
  expect(preview()).toHaveTextContent(/^Ark UI$/)
  expect(committed).toHaveBeenCalledWith('Ark UI')
})

test('select-on-focus false moves focus into the input when editing starts', async () => {
  start(Basic, { 'select-on-focus': 'false' })
  await waitFor(() => expect(preview()).toHaveTextContent('Hello World'))

  await user.tab()

  await waitFor(() => expect(input()).toHaveFocus())
  expect(input()).toBeVisible()
})

test('Escape cancels the edit and restores the previous value', async () => {
  mount(Basic)
  const reverted = vi.fn()
  editable().addEventListener('valuerevert', (event) => reverted((event as CustomEvent).detail.value))
  await waitFor(() => expect(preview()).toHaveTextContent('Hello World'))
  await user.tab()
  await editing()

  await user.clear(input())
  await user.type(input(), 'Discarded')
  await user.keyboard('{Escape}')

  await waitFor(() => expect(input()).not.toBeVisible())
  expect(preview()).toHaveTextContent(/^Hello World$/)
  expect(input()).toHaveValue('Hello World')
  expect(reverted).toHaveBeenCalledWith('Hello World')
})

test('dblclick activation ignores focus and starts editing on a double click', async () => {
  mount(DoubleClick)
  await waitFor(() => expect(preview()).toHaveTextContent('Double-click to edit'))

  await user.tab()
  await settle()
  expect(preview()).toHaveFocus()
  expect(input()).not.toBeVisible()

  await user.dblClick(preview())

  await editing()
  expect(preview()).not.toBeVisible()
})

test('the edit, submit and cancel triggers drive the editing state', async () => {
  mount(Controls)
  await waitFor(() => expect(preview()).toHaveTextContent('Click edit to start'))
  const edit = trigger('edit')
  const submit = trigger('submit')
  const cancel = trigger('cancel')
  expect(submit).not.toBeVisible()
  expect(cancel).not.toBeVisible()

  await user.click(edit)

  await editing()
  expect(edit).not.toBeVisible()
  expect(submit).toBeVisible()

  await user.clear(input())
  await user.type(input(), 'Saved')
  await user.click(submit)

  await waitFor(() => expect(edit).toBeVisible())
  expect(preview()).toHaveTextContent(/^Saved$/)

  await user.click(edit)
  await editing()
  await user.type(input(), ' and dropped')
  await user.click(cancel)

  await waitFor(() => expect(input()).not.toBeVisible())
  expect(edit).toBeVisible()
  expect(preview()).toHaveTextContent(/^Saved$/)
})

test('submit-mode none keeps editing on Enter', async () => {
  start(Basic, { 'submit-mode': 'none' })
  await waitFor(() => expect(preview()).toHaveTextContent('Hello World'))
  await user.tab()
  await editing()

  await user.type(input(), '!{Enter}')
  await settle()

  expect(input()).toBeVisible()
  expect(preview()).toHaveTextContent('Hello World!')
})

test('max-length caps the characters typed into the input', async () => {
  start(Basic, { 'default-value': '', 'max-length': '4' })
  await waitFor(() => expect(input()).toHaveAttribute('maxlength', '4'))
  await user.tab()
  await editing()

  await user.type(input(), 'abcdefgh{Enter}')

  await waitFor(() => expect(preview()).toHaveTextContent('abcd'))
  expect(preview()).not.toHaveTextContent('abcde')
})

test('a disabled editable cannot be activated', async () => {
  start(DoubleClick, { disabled: '' })
  await waitFor(() => expect(preview()).toHaveAttribute('aria-disabled', 'true'))
  expect(preview()).not.toHaveAttribute('tabindex')
  expect(input()).toBeDisabled()

  await user.dblClick(preview())
  await settle()

  expect(input()).not.toBeVisible()
  expect(preview()).toBeVisible()
})

test('a readonly editable shows the value without entering edit mode', async () => {
  start(DoubleClick, { readonly: '' })
  await waitFor(() => expect(preview()).toHaveAttribute('aria-readonly', 'true'))
  expect(editable()).toHaveAttribute('data-readonly', '')
  expect(input()).toHaveAttribute('readonly')

  await user.dblClick(preview())
  await settle()

  expect(input()).not.toBeVisible()
  expect(preview()).toHaveTextContent('Double-click to edit')
})

test('a controlled editable reports typing and follows its value attribute', async () => {
  mount(Controlled)
  const changed = vi.fn()
  editable().addEventListener('valuechange', (event) => changed((event as CustomEvent).detail.value))
  await waitFor(() => expect(preview()).toHaveTextContent('Hello World'))
  await user.tab()
  await editing()

  await user.type(input(), ' again{Enter}')

  await waitFor(() => expect(preview()).toHaveTextContent('Hello World again'))
  expect(changed).toHaveBeenLastCalledWith('Hello World again')

  editable().setAttribute('value', 'Set from outside')

  await waitFor(() => expect(preview()).toHaveTextContent('Set from outside'))
  expect(input()).toHaveValue('Set from outside')
})

test('Enter in a textarea editable adds a line instead of submitting', async () => {
  mount(Textarea)
  const textarea = document.querySelector('ark-editable-input textarea')!
  const span = document.querySelector('ark-editable-preview span')!
  await waitFor(() => expect(span).toHaveTextContent(/headless component library/))

  await user.dblClick(span)
  await waitFor(() => expect(textarea).toBeVisible())

  await user.type(textarea, '{Enter}')
  await settle()

  expect(textarea).toBeVisible()
  expect((textarea as HTMLTextAreaElement).value.endsWith('\n')).toBe(true)
})
