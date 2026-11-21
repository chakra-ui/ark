import { expect, test } from '@playwright/test'

const story = (name: string) => `/iframe.html?id=components-segment-group--${name}&viewMode=story`

test('segment group selects a clicked item and emits valuechange', async ({ page }) => {
  await page.goto(story('controlled'))
  const group = page.locator('ark-segment-group')
  await expect(page.locator('input[type=radio]')).toHaveCount(4)
  await page.getByText('Solid', { exact: true }).click()
  await expect(page.locator('output')).toHaveText('value: Solid')
  await expect(group).toHaveAttribute('value', 'Solid')
  await expect(page.locator('input[value=Solid]')).toBeChecked()
  await expect(page.locator('label[data-state=checked]')).toHaveText('Solid')
  await expect(page.locator('input[name=framework]:checked')).toHaveValue('Solid')
})

test('segment group moves the selection with arrow keys and skips disabled items', async ({ page }) => {
  await page.goto(story('disabled'))
  const checked = page.locator('label[data-state=checked]')
  await expect(checked).toHaveText('React')
  await page.locator('input[value=React]').focus()
  await page.keyboard.press('ArrowRight')
  await expect(checked).toHaveText('Solid')
  await page.keyboard.press('ArrowRight')
  await expect(checked).toHaveText('Vue')
  await page.keyboard.press('ArrowLeft')
  await expect(checked).toHaveText('Solid')
})

test('segment group indicator tracks the selected item', async ({ page }) => {
  await page.goto(story('basic'))
  const indicator = page.locator('ark-segment-group-indicator')
  const rectOf = (text: string) =>
    page.getByText(text, { exact: true }).evaluate((el) => {
      const label = el.closest('label')!
      return { left: `${label.offsetLeft}px`, width: `${label.offsetWidth}px` }
    })
  const vars = () =>
    indicator.evaluate((el) => ({
      left: el.style.getPropertyValue('--left'),
      width: el.style.getPropertyValue('--width'),
    }))

  await expect.poll(vars).toEqual(await rectOf('React'))
  await page.getByText('Svelte', { exact: true }).click()
  await expect.poll(vars).toEqual(await rectOf('Svelte'))

  await page.locator('ark-segment-group-item[value=Svelte] label').evaluate((el) => {
    el.style.paddingInline = '3rem'
  })
  await expect.poll(vars).toEqual(await rectOf('Svelte'))
})
