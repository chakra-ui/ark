import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as CustomValidation } from '../examples/custom-validation.js'
import { mount as Indicator } from '../examples/indicator.js'
import { mount as Input } from '../examples/input.js'
import { mount as Invalid } from '../examples/invalid.js'
import { mount as Item } from '../examples/item.js'
import { mount as Select } from '../examples/select.js'
import { mount as ServerErrors } from '../examples/server-errors.js'
import { mount as ShadowRoot } from '../examples/shadow-root.js'
import { mount as Textarea } from '../examples/textarea.js'
import { mount as Validation } from '../examples/validation.js'
import { mount } from '../../../test-utils.js'
import '@ark-ui/web/checkbox'
import '@ark-ui/web/field'

const checkboxMarkup = /* html */ `
  <ark-checkbox>
    <label>
      <ark-checkbox-control></ark-checkbox-control>
      <ark-checkbox-label>Accept</ark-checkbox-label>
      <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
    </label>
  </ark-checkbox>`

const field = () => document.querySelector('ark-field')!

const errorText = () => document.querySelector('ark-field-error-text')!

const helperText = () => document.querySelector('ark-field-helper-text')!

const checkboxInput = () => document.querySelector('ark-checkbox-hidden-input input')

const findNative = <T extends HTMLElement>(find: () => Promise<HTMLElement>, tag: string) =>
  waitFor(async () => {
    const element = await find()
    expect(element.localName).toBe(tag)
    return element as T
  })

const findTextbox = (name: string | RegExp) =>
  findNative<HTMLInputElement>(() => screen.findByRole('textbox', { name }), 'input')

const findCombobox = (name: string) => findNative(() => screen.findByRole('combobox', { name }), 'select')

test('the label, input and helper text are linked together', async () => {
  const user = userEvent.setup()
  mount(Input)
  const input = await findTextbox('Label')
  expect(input).toBeVisible()
  await waitFor(() => expect(input).toHaveAttribute('aria-describedby', helperText().id))
  expect(errorText()).not.toBeVisible()

  await user.click(screen.getByText('Label'))

  await waitFor(() => expect(input).toHaveFocus())
})

test('an invalid field shows its error and describes the input with it', async () => {
  mount(Invalid)
  const input = await findTextbox('Email')

  await waitFor(() => expect(errorText()).toBeVisible())
  expect(input).toHaveAttribute('aria-invalid', 'true')
  expect(input).toHaveAttribute('aria-describedby', errorText().id)
  expect(field()).toHaveAttribute('data-invalid', '')
})

test('required, readonly, invalid and disabled reach the input as the attributes change', async () => {
  mount(Input)
  const input = await findTextbox('Label')
  const helperId = helperText().id
  await waitFor(() => expect(input).toHaveAttribute('aria-describedby', helperId))

  field().setAttribute('required', '')
  field().setAttribute('readonly', '')
  field().setAttribute('invalid', '')

  await waitFor(() => expect(input).toHaveAttribute('required', ''))
  await waitFor(() => expect(input).toHaveAttribute('readonly', ''))
  await waitFor(() => expect(errorText()).toBeVisible())
  await waitFor(() => expect(input).toHaveAttribute('aria-describedby', `${helperId} ${errorText().id}`))

  field().setAttribute('disabled', '')

  await waitFor(() => expect(input).toBeDisabled())
  expect(field()).toHaveAttribute('data-disabled', '')

  field().removeAttribute('invalid')

  await waitFor(() => expect(errorText()).not.toBeVisible())
  expect(input).not.toHaveAttribute('aria-invalid')
})

test('a select or textarea is labelled by the field', async () => {
  mount(Select)

  expect(await findCombobox('Label')).toBeVisible()

  document.body.replaceChildren()
  mount(Textarea)

  expect(await findNative(() => screen.findByRole('textbox', { name: 'Label' }), 'textarea')).toBeVisible()
})

test('the required indicator shows only while the field is required', async () => {
  mount(Indicator)
  const indicator = document.querySelector('ark-field-indicator')!
  await waitFor(() => expect(indicator).toBeVisible())
  expect(indicator).toHaveAttribute('aria-hidden', 'true')
  const input = await findNative(() => screen.findByRole('textbox'), 'input')
  await waitFor(() => expect(input).toHaveAttribute('required', ''))

  field().removeAttribute('required')

  await waitFor(() => expect(indicator).not.toBeVisible())
})

test('each field item gets its own control id and the label targets one of them', async () => {
  const user = userEvent.setup()
  mount(Item)
  const amount = document.querySelector('ark-field-item[value=amount] input')!
  const currency = await findCombobox('Currency')

  await waitFor(() => expect(amount).toHaveAttribute('id', expect.stringMatching(/:item:amount$/)))
  await waitFor(() => expect(currency).toHaveAttribute('id', expect.stringMatching(/:item:currency$/)))
  expect(await findTextbox('Amount')).toBe(amount)

  await user.click(screen.getByText('Amount', { exact: true }))

  await waitFor(() => expect(amount).toHaveFocus())
})

test('a field inside a shadow root links its input and error', async () => {
  const root = mount(ShadowRoot)
  const shadow = root.firstElementChild!.shadowRoot! as unknown as HTMLElement

  const input = await findNative(() => within(shadow).findByRole('textbox', { name: 'Email' }), 'input')

  await waitFor(() => expect(input).toHaveAttribute('aria-invalid', 'true'))
  expect(input).toHaveAttribute('aria-describedby', expect.stringMatching(/error-text/))
})

test('a component inside a field takes its ids and states', async () => {
  mount((root) => {
    root.innerHTML = '<ark-field invalid required></ark-field>'
  })

  field().innerHTML = `${checkboxMarkup}<ark-field-error-text>Required</ark-field-error-text>`

  const label = document.querySelector('ark-checkbox label')!
  await waitFor(() => expect(checkboxInput()).toBeInstanceOf(HTMLInputElement))
  const input = checkboxInput()
  await waitFor(() => expect(input).toHaveAttribute('required', ''))
  await waitFor(() => expect(input).toHaveAttribute('id', field().api!.ids.control))
  await waitFor(() => expect(label).toHaveAttribute('data-invalid', ''))

  field().setAttribute('disabled', '')

  await waitFor(() => expect(input).toBeDisabled())
  await waitFor(() => expect(label).toHaveAttribute('data-disabled', ''))
})

test('an id on the field does not clash with the input id', async () => {
  const user = userEvent.setup()
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-field id="email">
        <ark-field-label><label>Email</label></ark-field-label>
        <ark-field-input><input /></ark-field-input>
      </ark-field>`
  })

  const input = await findTextbox('Email')

  expect(input).not.toHaveAttribute('id', 'email')
  expect(document.querySelectorAll('#email')).toHaveLength(1)

  await user.click(screen.getByText('Email'))

  await waitFor(() => expect(input).toHaveFocus())
})

test('ids set on a component inside a field are kept alongside the field ids', async () => {
  mount((root) => {
    root.innerHTML = '<ark-field></ark-field>'
  })
  const template = document.createElement('template')
  template.innerHTML = checkboxMarkup
  const checkbox = template.content.querySelector('ark-checkbox')!

  checkbox.ids = { label: 'custom-label' }
  field().append(checkbox)

  await waitFor(() => expect(document.querySelector('ark-checkbox-label')).toHaveAttribute('id', 'custom-label'))
  await waitFor(() => expect(checkboxInput()).toHaveAttribute('id', field().api!.ids.control))
})

test('the matching validation message shows after the input loses focus', async () => {
  const user = userEvent.setup()
  mount(Validation)
  const input = await findTextbox(/Email/)
  const missing = screen.getByText('Email is required')
  const mismatch = screen.getByText('Enter a valid email address')

  input.focus()
  input.blur()

  await waitFor(() => expect(missing).not.toBeVisible())

  await user.type(input, 'x')
  await user.clear(input)
  input.blur()

  await waitFor(() => expect(missing).toBeVisible())
  expect(input).toHaveAttribute('aria-invalid', 'true')

  await user.type(input, 'nope')
  input.blur()

  await waitFor(() => expect(mismatch).toBeVisible())
  expect(missing).not.toBeVisible()

  await user.clear(input)
  await user.type(input, 'me@example.com')
  input.blur()

  await waitFor(() => expect(mismatch).not.toBeVisible())
  expect(input).not.toHaveAttribute('aria-invalid')
})

test('custom validation messages show as the user types', async () => {
  const user = userEvent.setup()
  mount(CustomValidation)
  const input = await findTextbox('Username')

  await user.type(input, 'ad')

  await waitFor(() => expect(errorText()).toHaveTextContent('Use at least 3 characters'))
  expect(errorText()).toBeVisible()

  await user.clear(input)
  await user.type(input, 'admin')

  await waitFor(() => expect(errorText()).toHaveTextContent('This username is reserved'))

  await user.clear(input)
  await user.type(input, 'sage')

  await waitFor(() => expect(errorText()).not.toBeVisible())
})

test('a server error marks the field invalid until the value changes', async () => {
  const user = userEvent.setup()
  mount(ServerErrors)
  const input = await findTextbox('Email')

  await user.click(screen.getByRole('button', { name: 'Submit' }))

  await waitFor(() => expect(errorText()).toHaveTextContent('This email is already registered'))
  expect(input).toHaveAttribute('aria-invalid', 'true')

  await user.clear(input)
  await user.type(input, 'new@example.com')

  await waitFor(() => expect(input).not.toHaveAttribute('aria-invalid'))
})
