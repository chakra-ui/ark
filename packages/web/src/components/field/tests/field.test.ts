import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as CustomValidation } from '../../../../examples/field/custom-validation.js'
import { mount as Indicator } from '../../../../examples/field/indicator.js'
import { mount as Input } from '../../../../examples/field/input.js'
import { mount as Invalid } from '../../../../examples/field/invalid.js'
import { mount as Item } from '../../../../examples/field/item.js'
import { mount as Select } from '../../../../examples/field/select.js'
import { mount as ServerErrors } from '../../../../examples/field/server-errors.js'
import { mount as ShadowRoot } from '../../../../examples/field/shadow-root.js'
import { mount as Textarea } from '../../../../examples/field/textarea.js'
import { mount as Validation } from '../../../../examples/field/validation.js'
import { mount } from '../../../test-utils.js'
import '@ark-ui/web/checkbox'
import '@ark-ui/web/field'

const findNative = <T extends HTMLElement>(find: () => Promise<HTMLElement>, tag: string) =>
  waitFor(async () => {
    const element = await find()
    expect(element.localName).toBe(tag)
    return element as T
  })

const findTextbox = (name: string | RegExp) =>
  findNative<HTMLInputElement>(() => screen.findByRole('textbox', { name }), 'input')

test('field links the label, input, helper and error text', async () => {
  const user = userEvent.setup()
  mount(Input)
  const input = await findTextbox('Label')

  expect(input).toBeVisible()

  const helper = document.querySelector('ark-field-helper-text')!

  await waitFor(() => expect(input).toHaveAttribute('aria-describedby', helper.id))
  expect(document.querySelector('ark-field-error-text')).not.toBeVisible()

  await user.click(screen.getByText('Label'))
  await waitFor(() => expect(input).toHaveFocus())
})

test('invalid field shows its error and describes the input with it', async () => {
  mount(Invalid)
  const input = await findTextbox('Email')
  const error = document.querySelector('ark-field-error-text')!

  await waitFor(() => expect(error).toBeVisible())
  expect(input).toHaveAttribute('aria-invalid', 'true')
  expect(input).toHaveAttribute('aria-describedby', error.id)
  expect(document.querySelector('ark-field')).toHaveAttribute('data-invalid', '')
})

test('field states reach the native control and update with the attributes', async () => {
  mount(Input)
  const field = document.querySelector('ark-field')!
  const input = await findTextbox('Label')
  const error = document.querySelector('ark-field-error-text')!
  const helper = document.querySelector('ark-field-helper-text')!

  await waitFor(() => expect(input).toHaveAttribute('aria-describedby', helper.id))
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

  field.setAttribute('required', '')
  field.setAttribute('readonly', '')
  field.setAttribute('invalid', '')

  await waitFor(() => expect(input).toHaveAttribute('required', ''))
  await waitFor(() => expect(input).toHaveAttribute('readonly', ''))
  await waitFor(() => expect(error).toBeVisible())
  await waitFor(() => expect(input).toHaveAttribute('aria-describedby', `${helper.id} ${error.id}`))

  field.setAttribute('disabled', '')

  await waitFor(() => expect(input).toBeDisabled())
  expect(field).toHaveAttribute('data-disabled', '')

  field.removeAttribute('invalid')

  await waitFor(() => expect(error).not.toBeVisible())
  expect(input).not.toHaveAttribute('aria-invalid')
})

test('field select and textarea receive the control props', async () => {
  mount(Select)
  const select = await findNative(() => screen.findByRole('combobox', { name: 'Label' }), 'select')

  expect(select).toBeVisible()

  document.body.replaceChildren()
  mount(Textarea)
  const textarea = await findNative(() => screen.findByRole('textbox', { name: 'Label' }), 'textarea')

  expect(textarea).toBeVisible()
})

test('required indicator shows only while the field is required', async () => {
  mount(Indicator)
  const indicator = document.querySelector('ark-field-indicator')!

  await waitFor(() => expect(indicator).toBeVisible())
  expect(indicator).toHaveAttribute('aria-hidden', 'true')

  const input = await findNative(() => screen.findByRole('textbox'), 'input')

  await waitFor(() => expect(input).toHaveAttribute('required', ''))

  document.querySelector('ark-field')!.removeAttribute('required')

  await waitFor(() => expect(indicator).not.toBeVisible())
})

test('field items get their own control ids and the label follows the target item', async () => {
  const user = userEvent.setup()
  mount(Item)
  const amount = document.querySelector('ark-field-item[value=amount] input')!
  const currency = await findNative(() => screen.findByRole('combobox', { name: 'Currency' }), 'select')

  await waitFor(() => expect(amount).toHaveAttribute('id', expect.stringMatching(/:item:amount$/)))
  await waitFor(() => expect(currency).toHaveAttribute('id', expect.stringMatching(/:item:currency$/)))
  expect(await findTextbox('Amount')).toBe(amount)

  await user.click(screen.getByText('Amount', { exact: true }))
  await waitFor(() => expect(amount).toHaveFocus())
})

test('field works inside a shadow root', async () => {
  const root = mount(ShadowRoot)
  const shadow = root.firstElementChild!.shadowRoot!
  const input = await findNative<HTMLInputElement>(
    () => within(shadow as unknown as HTMLElement).findByRole('textbox', { name: 'Email' }),
    'input',
  )

  await waitFor(() => expect(input).toHaveAttribute('aria-invalid', 'true'))
  expect(input).toHaveAttribute('aria-describedby', expect.stringMatching(/error-text/))
})

test('components inside a field take its label, ids and states', async () => {
  mount((root) => {
    root.innerHTML = '<ark-field invalid required></ark-field>'
  })

  document.querySelector('ark-field')!.innerHTML = /* html */ `
    <ark-checkbox>
      <label>
        <ark-checkbox-control></ark-checkbox-control>
        <ark-checkbox-label>Accept</ark-checkbox-label>
        <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
      </label>
    </ark-checkbox>
    <ark-field-error-text>Required</ark-field-error-text>`

  const field = document.querySelector('ark-field')!
  const label = document.querySelector('ark-checkbox label')!
  const hidden = await waitFor(() => {
    const input = document.querySelector('ark-checkbox-hidden-input input')
    expect(input).toBeInstanceOf(HTMLInputElement)
    return input as HTMLInputElement
  })

  await waitFor(() => expect(hidden).toHaveAttribute('required', ''))
  await waitFor(() => expect(hidden).toHaveAttribute('id', field.api!.ids.control))
  await waitFor(() => expect(label).toHaveAttribute('data-invalid', ''))

  field.setAttribute('disabled', '')

  await waitFor(() => expect(hidden).toBeDisabled())
  await waitFor(() => expect(label).toHaveAttribute('data-disabled', ''))
})

test('an id on the field host does not collide with the control id', async () => {
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

test('ids assigned to a component inside a field add to the field ids', async () => {
  mount((root) => {
    root.innerHTML = '<ark-field></ark-field>'
  })

  const field = document.querySelector('ark-field')!
  const template = document.createElement('template')

  template.innerHTML = /* html */ `
    <ark-checkbox>
      <label>
        <ark-checkbox-control></ark-checkbox-control>
        <ark-checkbox-label>Accept</ark-checkbox-label>
        <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
      </label>
    </ark-checkbox>`

  const checkbox = template.content.firstElementChild as HTMLElementTagNameMap['ark-checkbox']
  checkbox.ids = { label: 'custom-label' }
  field.append(checkbox)

  await waitFor(() => expect(document.querySelector('ark-checkbox-label')).toHaveAttribute('id', 'custom-label'))
  await waitFor(() =>
    expect(document.querySelector('ark-checkbox-hidden-input input')).toHaveAttribute('id', field.api!.ids.control),
  )
})

test('validation shows the matching native error after the control loses focus', async () => {
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

test('custom validation reports its errors through validitychange', async () => {
  const user = userEvent.setup()
  mount(CustomValidation)
  const input = await findTextbox('Username')
  const error = document.querySelector('ark-field-error-text')!

  await user.type(input, 'ad')

  await waitFor(() => expect(error).toHaveTextContent('Use at least 3 characters'))
  expect(error).toBeVisible()

  await user.clear(input)
  await user.type(input, 'admin')

  await waitFor(() => expect(error).toHaveTextContent('This username is reserved'))

  await user.clear(input)
  await user.type(input, 'sage')

  await waitFor(() => expect(error).not.toBeVisible())
})

test('server errors mark the field invalid until the value changes', async () => {
  const user = userEvent.setup()
  mount(ServerErrors)
  const input = await findTextbox('Email')

  await user.click(screen.getByRole('button', { name: 'Submit' }))

  await waitFor(() =>
    expect(document.querySelector('ark-field-error-text')).toHaveTextContent('This email is already registered'),
  )
  expect(input).toHaveAttribute('aria-invalid', 'true')

  await user.clear(input)
  await user.type(input, 'new@example.com')

  await waitFor(() => expect(input).not.toHaveAttribute('aria-invalid'))
})
