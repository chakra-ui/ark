import { screen, waitFor } from '@testing-library/dom'

import { mount as Basic } from '../../../../examples/fieldset/basic.js'
import { mount as Disabled } from '../../../../examples/fieldset/disabled.js'
import { mount as Invalid } from '../../../../examples/fieldset/invalid.js'
import { mount as WithCheckbox } from '../../../../examples/fieldset/with-checkbox.js'
import { mount } from '../../../test-utils.js'
import '@ark-ui/web/field'
import '@ark-ui/web/fieldset'

const findTextbox = (name: string) =>
  waitFor(async () => {
    const element = await screen.findByRole('textbox', { name })
    expect(element.localName).toBe('input')
    return element as HTMLInputElement
  })

test('fieldset is named by its legend', async () => {
  mount(Basic)

  expect(await screen.findByRole('group', { name: 'Contact Details' })).toBeVisible()
  expect(await findTextbox('Name')).toBeVisible()
})

test('disabled fieldset disables its fields and describes itself with the helper text', async () => {
  mount(Disabled)
  const fieldset = document.querySelector('fieldset')!
  const helper = document.querySelector('ark-fieldset-helper-text')!
  const field = document.querySelector('ark-field')!

  await waitFor(() => expect(fieldset).toHaveAttribute('disabled', ''))
  await waitFor(() => expect(fieldset).toHaveAttribute('aria-describedby', helper.id))

  for (const name of ['Street', 'City']) {
    const input = await findTextbox(name)
    await waitFor(() => expect(input).toBeDisabled())
  }

  await waitFor(() => expect(field).toHaveAttribute('data-disabled', ''))

  document.querySelector('ark-fieldset')!.removeAttribute('disabled')

  await waitFor(async () => expect(await findTextbox('Street')).toBeEnabled())
  await waitFor(() => expect(field).not.toHaveAttribute('data-disabled'))
})

test('invalid fieldset shows its error text', async () => {
  mount(Invalid)
  const error = document.querySelector('ark-fieldset-error-text')!
  const fieldset = document.querySelector('fieldset')!

  await waitFor(() => expect(error).toBeVisible())
  await waitFor(() => expect(fieldset).toHaveAttribute('aria-describedby', error.id))
  expect(fieldset).toHaveAttribute('data-invalid', '')

  document.querySelector('ark-fieldset')!.removeAttribute('invalid')

  await waitFor(() => expect(error).not.toBeVisible())
  expect(fieldset).not.toHaveAttribute('aria-describedby')
})

test('fieldset groups other components', async () => {
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

  await waitFor(() => expect(document.querySelector('ark-field')).toHaveAttribute('data-disabled', ''))
  await waitFor(() => expect(document.querySelector('ark-field label')).toHaveAttribute('data-disabled', ''))
})
