import { expect, test } from '@playwright/test'
import type {} from '../index.js'

const story = (name: string) => `/iframe.html?id=components-fieldset--${name}&viewMode=story`

test('fieldset is named by its legend', async ({ page }) => {
  await page.goto(story('basic'))
  await expect(page.getByRole('group', { name: 'Contact Details' })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible()
})

test('disabled fieldset disables its fields and describes itself with the helper text', async ({ page }) => {
  await page.goto(story('disabled'))
  const fieldset = page.locator('fieldset')
  await expect(fieldset).toHaveAttribute('disabled', '')
  await expect(fieldset).toHaveAttribute(
    'aria-describedby',
    (await page.locator('ark-fieldset-helper-text').getAttribute('id'))!,
  )
  for (const name of ['Street', 'City']) await expect(page.getByRole('textbox', { name })).toBeDisabled()
  await expect(page.locator('ark-field').first()).toHaveAttribute('data-disabled', '')
  await page.locator('ark-fieldset').evaluate((el) => el.removeAttribute('disabled'))
  await expect(page.getByRole('textbox', { name: 'Street' })).toBeEnabled()
  await expect(page.locator('ark-field').first()).not.toHaveAttribute('data-disabled')
})

test('invalid fieldset shows its error text', async ({ page }) => {
  await page.goto(story('invalid'))
  const error = page.locator('ark-fieldset-error-text')
  await expect(error).toBeVisible()
  await expect(page.locator('fieldset')).toHaveAttribute('aria-describedby', (await error.getAttribute('id'))!)
  await expect(page.locator('fieldset')).toHaveAttribute('data-invalid', '')
  await page.locator('ark-fieldset').evaluate((el) => el.removeAttribute('invalid'))
  await expect(error).toBeHidden()
  await expect(page.locator('fieldset')).not.toHaveAttribute('aria-describedby')
})

test('fieldset groups other components', async ({ page }) => {
  await page.goto(story('with-checkbox'))
  await expect(page.getByRole('group', { name: 'Email Preferences' })).toBeVisible()
  await expect(page.getByRole('checkbox', { name: 'Product updates' })).toBeChecked()
})

test('a disabled fieldset disables a field that has no control', async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
  await page.setContent(/* html */ `
    <ark-fieldset disabled>
      <fieldset>
        <ark-fieldset-legend>Legend</ark-fieldset-legend>
        <ark-field><ark-field-label><label>Label</label></ark-field-label></ark-field>
      </fieldset>
    </ark-fieldset>`)
  await expect(page.locator('ark-field')).toHaveAttribute('data-disabled', '')
  await expect(page.locator('ark-field label')).toHaveAttribute('data-disabled', '')
})
