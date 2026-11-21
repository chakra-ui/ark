import { expect, test } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-steps--${name}&viewMode=story`

test('steps next and back move the step and emit valuechange', async ({ page }) => {
  await page.goto(story('controlled'))
  const steps = page.locator('ark-steps')
  const output = page.locator('output')

  await expect(page.getByText('First - Contact Info')).toBeVisible()
  await page.getByRole('button', { name: 'Next' }).click()
  await expect(output).toHaveText('current step: second')
  await expect(steps).toHaveAttribute('value', 'second')
  await expect(page.getByText('Second - Date & Time')).toBeVisible()
  await expect(page.getByText('First - Contact Info')).toBeHidden()

  await page.getByRole('button', { name: 'Back' }).click()
  await expect(output).toHaveText('current step: first')
  await expect(page.getByText('First - Contact Info')).toBeVisible()
})

test('steps trigger jumps to its step', async ({ page }) => {
  await page.goto(story('basic'))
  const third = page.getByRole('tab', { name: 'Third' })

  await third.click()
  await expect(third).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('ark-steps-item[value=third]')).toHaveAttribute('data-current', '')
  await expect(page.getByText('Third - Select Rooms')).toBeVisible()
})

test('steps shows completed content after the last step', async ({ page }) => {
  await page.goto(story('basic'))
  const next = page.getByRole('button', { name: 'Next' })
  const completed = page.getByText('Steps Complete - Thank you for filling out the form!')

  await expect(completed).toBeHidden()
  for (let i = 0; i < 3; i++) await next.click()
  await expect(completed).toBeVisible()
  await expect(next).toBeDisabled()
  await expect(page.locator('ark-steps')).toHaveAttribute('data-complete', '')
  await expect(page.locator('ark-steps-indicator[data-complete]')).toHaveCount(3)
})

test('steps vertical orientation sets data-orientation', async ({ page }) => {
  await page.goto(story('vertical'))

  await expect(page.locator('ark-steps')).toHaveAttribute('data-orientation', 'vertical')
  await expect(page.locator('ark-steps-list')).toHaveAttribute('aria-orientation', 'vertical')
  await expect(page.getByRole('tab', { name: 'First' })).toHaveAttribute('data-orientation', 'vertical')
})
