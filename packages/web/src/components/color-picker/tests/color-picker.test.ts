import { screen, waitFor, within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/color-picker/basic.js'
import { mount as Controlled } from '../../../../examples/color-picker/controlled.js'
import { mount as FormUsage } from '../../../../examples/color-picker/form-usage.js'
import { mount as OpenControlled } from '../../../../examples/color-picker/open-controlled.js'
import { mount as SliderOnly } from '../../../../examples/color-picker/slider-only.js'
import { mount as SwatchOnly } from '../../../../examples/color-picker/swatch-only.js'
import '../../field/index.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

afterEach(() => {
  document.body.innerHTML = ''
})

const content = () => document.querySelector<HTMLElement>('ark-color-picker-content')!
const hexInput = () => document.querySelector<HTMLInputElement>('ark-color-picker-channel-input[channel=hex] input')!

test('color picker opens from its trigger and shows the area and sliders', async () => {
  mount(Basic)
  await waitFor(() => expect(hexInput()).toHaveValue('#EB5E41'))
  expect(content()).not.toBeVisible()
  await user.click(document.querySelector<HTMLElement>('ark-color-picker-trigger button')!)
  await waitFor(() => expect(content()).toBeVisible())
  expect(within(content()).getAllByRole('slider').length).toBeGreaterThanOrEqual(3)
})

test('color picker takes a value typed into the hex input', async () => {
  mount(Basic)
  const picker = document.querySelector('ark-color-picker')!
  await picker.ready
  await user.clear(hexInput())
  await user.type(hexInput(), '#00ff00{Enter}')
  await waitFor(() => expect(picker.value).toMatch(/^rgba\(0, 255, 0/))
  expect(document.querySelector('ark-color-picker-hidden-input input')).toHaveValue(picker.value)
})

test('color picker selects a swatch and updates the value text', async () => {
  mount(SwatchOnly)
  const text = document.querySelector('ark-color-picker-value-text')!
  await user.click((await screen.findAllByRole('button', { name: /as the color/i }))[0])
  await waitFor(() => expect(text.textContent).toMatch(/^rgba\(255, 0, 0/))
  expect(document.querySelector('ark-color-picker-swatch-trigger button')).toHaveAttribute('data-state', 'checked')
})

test('color picker view shows only for the current format', async () => {
  mount(SliderOnly)
  const view = document.querySelector('ark-color-picker-view')!
  const picker = document.querySelector('ark-color-picker')!
  await picker.ready
  await waitFor(() => expect(view).toBeVisible())
  picker.format = 'hsla'
  await waitFor(() => expect(view).not.toBeVisible())
})

test('controlled color picker reports and keeps the value it is given', async () => {
  mount(Controlled)
  const selected = document.querySelector('[data-selected]')!
  expect(selected).toHaveTextContent('#FF5500')
  await user.clear(hexInput())
  await user.type(hexInput(), '#123456{Enter}')
  await waitFor(() => expect(selected).toHaveTextContent('#123456'))
})

test('color picker submits its value through the hidden input', async () => {
  mount(FormUsage)
  await document.querySelector('ark-color-picker')!.ready
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  await waitFor(() => expect(document.querySelector('[data-submitted]')).toHaveTextContent(/^color: rgba\(235, 94, 65/))
})

test('open-controlled color picker opens and closes from outside', async () => {
  mount(OpenControlled)
  await document.querySelector('ark-color-picker')!.ready
  await user.click(screen.getByRole('button', { name: 'Toggle' }))
  await waitFor(() => expect(content()).toBeVisible())
  await user.click(screen.getByRole('button', { name: 'Toggle' }))
  await waitFor(() => expect(content()).not.toBeVisible())
})

test('color picker inside a field takes the field ids and states', async () => {
  mount((root) => {
    root.innerHTML = '<ark-field invalid></ark-field>'
  })
  const field = document.querySelector('ark-field')!
  await field.ready
  field.innerHTML = `
    <ark-color-picker default-value="#eb5e41">
      <ark-color-picker-label>Color</ark-color-picker-label>
      <ark-color-picker-control>
        <ark-color-picker-channel-input channel="hex"><input /></ark-color-picker-channel-input>
      </ark-color-picker-control>
    </ark-color-picker>`
  await document.querySelector('ark-color-picker')!.ready
  await waitFor(() =>
    expect(document.querySelector('ark-color-picker-label')).toHaveAttribute('id', field.api!.ids.label),
  )
  expect(document.querySelector('ark-color-picker-label')).toHaveAttribute('data-invalid', '')
})

test('color picker fills the format select and switches format', async () => {
  document.body.innerHTML = `
    <ark-color-picker inline default-value="#ff0000">
      <ark-color-picker-format-select><select></select></ark-color-picker-format-select>
      <ark-color-picker-value-swatch respect-alpha="false"><ark-color-picker-swatch-indicator></ark-color-picker-swatch-indicator></ark-color-picker-value-swatch>
    </ark-color-picker>`
  const picker = document.querySelector('ark-color-picker')!
  await picker.ready
  const select = document.querySelector('select')!
  expect([...select.options].map((option) => option.value)).toEqual(['rgba', 'hsla', 'hsba'])
  await user.selectOptions(select, 'hsla')
  await waitFor(() => expect(picker.format).toBe('hsla'))
})

test('color picker swatch respects respect-alpha="false"', async () => {
  document.body.innerHTML = `
    <ark-color-picker inline default-value="rgba(255, 0, 0, 0.5)">
      <ark-color-picker-swatch value="rgba(255, 0, 0, 0.5)" respect-alpha="false"></ark-color-picker-swatch>
    </ark-color-picker>`
  await document.querySelector('ark-color-picker')!.ready
  const swatch = document.querySelector<HTMLElement>('ark-color-picker-swatch')!
  await waitFor(() => expect(swatch.style.background).toMatch(/^#ff0000$/i))
})
