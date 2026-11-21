import { expect, test } from '@playwright/test'
import type {} from '../index.js'

const story = (name: string) => `/iframe.html?id=components-field--${name}&viewMode=story`

test('field links the label, input, helper and error text', async ({ page }) => {
  await page.goto(story('input'))
  const input = page.getByRole('textbox', { name: 'Label' })
  await expect(input).toBeVisible()
  const helperId = await page.locator('ark-field-helper-text').getAttribute('id')
  await expect(input).toHaveAttribute('aria-describedby', helperId!)
  await expect(page.locator('ark-field-error-text')).toBeHidden()
  await page.getByText('Label').click()
  await expect(input).toBeFocused()
})

test('invalid field shows its error and describes the input with it', async ({ page }) => {
  await page.goto(story('invalid'))
  const input = page.getByRole('textbox', { name: 'Email' })
  const error = page.locator('ark-field-error-text')
  await expect(error).toBeVisible()
  await expect(input).toHaveAttribute('aria-invalid', 'true')
  await expect(input).toHaveAttribute('aria-describedby', (await error.getAttribute('id'))!)
  await expect(page.locator('ark-field')).toHaveAttribute('data-invalid', '')
})

test('field states reach the native control and update with the attributes', async ({ page }) => {
  await page.goto(story('input'))
  const field = page.locator('ark-field')
  const input = page.getByRole('textbox', { name: 'Label' })
  await field.evaluate((el) => {
    el.setAttribute('required', '')
    el.setAttribute('readonly', '')
    el.setAttribute('invalid', '')
  })
  await expect(input).toHaveAttribute('required', '')
  await expect(input).toHaveAttribute('readonly', '')
  await expect(page.locator('ark-field-error-text')).toBeVisible()
  const errorId = await page.locator('ark-field-error-text').getAttribute('id')
  const helperId = await page.locator('ark-field-helper-text').getAttribute('id')
  await expect(input).toHaveAttribute('aria-describedby', `${helperId} ${errorId}`)
  await field.evaluate((el) => el.setAttribute('disabled', ''))
  await expect(input).toBeDisabled()
  await expect(field).toHaveAttribute('data-disabled', '')
  await field.evaluate((el) => el.removeAttribute('invalid'))
  await expect(page.locator('ark-field-error-text')).toBeHidden()
  await expect(input).not.toHaveAttribute('aria-invalid')
})

test('field select and textarea receive the control props', async ({ page }) => {
  await page.goto(story('select'))
  await expect(page.getByRole('combobox', { name: 'Label' })).toBeVisible()
  await page.goto(story('textarea'))
  await expect(page.getByRole('textbox', { name: 'Label' })).toBeVisible()
})

test('autoresize textarea grows with its content', async ({ page }) => {
  await page.goto(story('textarea-autoresize'))
  const textarea = page.getByRole('textbox', { name: 'Label' })
  const before = await textarea.evaluate((el) => el.getBoundingClientRect().height)
  await textarea.fill('one\ntwo\nthree\nfour\nfive\nsix')
  await expect.poll(() => textarea.evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThan(before)
})

test('required indicator shows only while the field is required', async ({ page }) => {
  await page.goto(story('indicator'))
  const indicator = page.locator('ark-field-indicator')
  await expect(indicator).toBeVisible()
  await expect(indicator).toHaveAttribute('aria-hidden', 'true')
  await expect(page.getByRole('textbox')).toHaveAttribute('required', '')
  await page.locator('ark-field').evaluate((el) => el.removeAttribute('required'))
  await expect(indicator).toBeHidden()
})

test('field items get their own control ids and the label follows the target item', async ({ page }) => {
  await page.goto(story('item'))
  const amount = page.locator('ark-field-item[value=amount] input')
  const currency = page.getByRole('combobox', { name: 'Currency' })
  await expect(amount).toHaveAttribute('id', /:item:amount$/)
  await expect(currency).toHaveAttribute('id', /:item:currency$/)
  await expect(page.getByRole('textbox', { name: 'Amount' })).toBeVisible()
  await page.getByText('Amount', { exact: true }).click()
  await expect(amount).toBeFocused()
})

test('field works inside a shadow root', async ({ page }) => {
  await page.goto(story('shadow-root'))
  const input = page.getByRole('textbox', { name: 'Email' })
  await expect(input).toHaveAttribute('aria-invalid', 'true')
  await expect(input).toHaveAttribute('aria-describedby', /error-text/)
})

test('components inside a field take its label, ids and states', async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
  await page.setContent(/* html */ `
    <ark-field invalid required>
      <ark-checkbox>
        <label>
          <ark-checkbox-control></ark-checkbox-control>
          <ark-checkbox-label>Accept</ark-checkbox-label>
          <ark-checkbox-hidden-input></ark-checkbox-hidden-input>
        </label>
      </ark-checkbox>
      <ark-field-error-text>Required</ark-field-error-text>
    </ark-field>`)
  const hidden = page.locator('ark-checkbox-hidden-input input')
  const field = page.locator('ark-field')
  await expect(hidden).toHaveAttribute('required', '')
  await expect(hidden).toHaveAttribute(
    'id',
    (await field.evaluate((el) => (el as HTMLElementTagNameMap['ark-field']).api!.ids.control))!,
  )
  await expect(page.locator('ark-checkbox label')).toHaveAttribute('data-invalid', '')
  await field.evaluate((el) => el.setAttribute('disabled', ''))
  await expect(hidden).toBeDisabled()
  await expect(page.locator('ark-checkbox label')).toHaveAttribute('data-disabled', '')
})

test('an id on the field host does not collide with the control id', async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
  await page.setContent(/* html */ `
    <ark-field id="email">
      <ark-field-label><label>Email</label></ark-field-label>
      <ark-field-input><input /></ark-field-input>
    </ark-field>`)
  const input = page.getByRole('textbox', { name: 'Email' })
  await expect(input).not.toHaveAttribute('id', 'email')
  await expect(page.locator('#email')).toHaveCount(1)
  await page.getByText('Email').click()
  await expect(input).toBeFocused()
})

test('ids assigned to a component inside a field add to the field ids', async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
  await page.setContent('<ark-field></ark-field>')
  await page.locator('ark-field').evaluate((field) => {
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
  })
  const controlId = await page
    .locator('ark-field')
    .evaluate((el) => (el as HTMLElementTagNameMap['ark-field']).api!.ids.control)
  await expect(page.locator('ark-checkbox-label')).toHaveAttribute('id', 'custom-label')
  await expect(page.locator('ark-checkbox-hidden-input input')).toHaveAttribute('id', controlId)
})

test('validation shows the matching native error after the control loses focus', async ({ page }) => {
  await page.goto(story('validation'))
  const input = page.getByRole('textbox', { name: /Email/ })
  const missing = page.getByText('Email is required')
  const mismatch = page.getByText('Enter a valid email address')
  await input.focus()
  await input.blur()
  // A pristine required field is not flagged until it has been edited or submitted
  await expect(missing).toBeHidden()
  await input.fill('x')
  await input.fill('')
  await input.blur()
  await expect(missing).toBeVisible()
  await expect(input).toHaveAttribute('aria-invalid', 'true')
  await input.fill('nope')
  await input.blur()
  await expect(mismatch).toBeVisible()
  await expect(missing).toBeHidden()
  await input.fill('me@example.com')
  await input.blur()
  await expect(mismatch).toBeHidden()
  await expect(input).not.toHaveAttribute('aria-invalid')
})

test('custom validation reports its errors through validitychange', async ({ page }) => {
  await page.goto(story('custom-validation'))
  const input = page.getByRole('textbox', { name: 'Username' })
  const error = page.locator('ark-field-error-text')
  await input.fill('ad')
  await expect(error).toHaveText('Use at least 3 characters')
  await expect(error).toBeVisible()
  await input.fill('admin')
  await expect(error).toHaveText('This username is reserved')
  await input.fill('sage')
  await expect(error).toBeHidden()
})

test('server errors mark the field invalid until the value changes', async ({ page }) => {
  await page.goto(story('server-errors'))
  const input = page.getByRole('textbox', { name: 'Email' })
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page.locator('ark-field-error-text')).toHaveText('This email is already registered')
  await expect(input).toHaveAttribute('aria-invalid', 'true')
  await input.fill('new@example.com')
  await expect(input).not.toHaveAttribute('aria-invalid')
})
