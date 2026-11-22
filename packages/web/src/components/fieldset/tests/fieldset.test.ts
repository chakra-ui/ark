import { screen, waitFor } from '@testing-library/dom'

import { mount as Basic } from '../examples/basic.js'
import { mount as Disabled } from '../examples/disabled.js'
import { mount as Invalid } from '../examples/invalid.js'
import { mount as WithCheckbox } from '../examples/with-checkbox.js'
import { mount } from '../../../test-utils.js'
import '@ark-ui/web/field'
import '@ark-ui/web/fieldset'

const fieldsetRoot = () => document.querySelector('ark-fieldset')!

const fieldset = () => document.querySelector('fieldset')!

const field = () => document.querySelector('ark-field')!

const findTextbox = (name: string) =>
  waitFor(async () => {
    const element = await screen.findByRole('textbox', { name })
    expect(element.localName).toBe('input')
    return element as HTMLInputElement
  })

test('the fieldset is named by its legend', async () => {
  mount(Basic)

  expect(await screen.findByRole('group', { name: 'Contact Details' })).toBeVisible()
  expect(await findTextbox('Name')).toBeVisible()
})

test('a disabled fieldset disables its fields until the attribute is removed', async () => {
  mount(Disabled)
  const helper = document.querySelector('ark-fieldset-helper-text')!

  await waitFor(() => expect(fieldset()).toHaveAttribute('disabled', ''))
  await waitFor(() => expect(fieldset()).toHaveAttribute('aria-describedby', helper.id))
  for (const name of ['Street', 'City']) {
    const input = await findTextbox(name)
    await waitFor(() => expect(input).toBeDisabled())
  }
  await waitFor(() => expect(field()).toHaveAttribute('data-disabled', ''))

  fieldsetRoot().removeAttribute('disabled')

  await waitFor(async () => expect(await findTextbox('Street')).toBeEnabled())
  await waitFor(() => expect(field()).not.toHaveAttribute('data-disabled'))
})

test('an invalid fieldset shows its error text until the attribute is removed', async () => {
  mount(Invalid)
  const error = document.querySelector('ark-fieldset-error-text')!

  await waitFor(() => expect(error).toBeVisible())
  await waitFor(() => expect(fieldset()).toHaveAttribute('aria-describedby', error.id))
  expect(fieldset()).toHaveAttribute('data-invalid', '')

  fieldsetRoot().removeAttribute('invalid')

  await waitFor(() => expect(error).not.toBeVisible())
  expect(fieldset()).not.toHaveAttribute('aria-describedby')
})

test('a fieldset can group other components', async () => {
  mount(WithCheckbox)

  expect(await screen.findByRole('group', { name: 'Email Preferences' })).toBeVisible()
  await waitFor(() => expect(screen.getByRole('checkbox', { name: 'Product updates' })).toBeChecked())
})

test('a disabled fieldset disables a field that has no control', async () => {
  mount((root) => {
    root.innerHTML = /* html */ `
      <ark-fieldset disabled>
        <fieldset>
          <ark-fieldset-legend>Legend</ark-fieldset-legend>
          <ark-field><ark-field-label><label>Label</label></ark-field-label></ark-field>
        </fieldset>
      </ark-fieldset>`
  })

  await waitFor(() => expect(field()).toHaveAttribute('data-disabled', ''))
  await waitFor(() => expect(document.querySelector('ark-field label')).toHaveAttribute('data-disabled', ''))
})
