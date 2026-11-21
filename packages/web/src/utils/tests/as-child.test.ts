import { expect, test } from '@playwright/test'
import type {} from '../../index.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/test-fixtures/index.html')
})

test('as-child moves part props onto the first element child', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-collapsible>
      <ark-collapsible-trigger as-child><div tabindex="0">Toggle</div></ark-collapsible-trigger>
      <ark-collapsible-content as-child><section>Panel</section></ark-collapsible-content>
    </ark-collapsible>`)
  const trigger = page.locator('ark-collapsible-trigger > div')
  const content = page.locator('ark-collapsible-content > section')
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(trigger).toHaveAttribute('data-collapsible-trigger')
  await expect(page.locator('ark-collapsible-trigger')).not.toHaveAttribute('data-collapsible-trigger')
  await expect(content).toHaveAttribute('data-collapsible-content')
  await expect(content).toBeHidden()
  expect(await page.locator('ark-collapsible-content').evaluate((el) => getComputedStyle(el).display)).toBe('contents')

  await trigger.click()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(content).toBeVisible()
})

test('as-child moves root props onto the first element child', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-tabs as-child default-value="a">
      <section>
        <ark-tabs-list>
          <ark-tabs-trigger value="a"><button>A</button></ark-tabs-trigger>
        </ark-tabs-list>
        <ark-tabs-content value="a">Panel A</ark-tabs-content>
      </section>
    </ark-tabs>`)
  await expect(page.locator('ark-tabs > section')).toHaveAttribute('data-tabs-root')
  await expect(page.locator('ark-tabs')).not.toHaveAttribute('data-tabs-root')
  expect(await page.locator('ark-tabs').evaluate((el) => getComputedStyle(el).display)).toBe('contents')
})

test('as-child moves props to a replacement child and strips the old one', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-collapsible>
      <ark-collapsible-trigger as-child><div data-testid="old" tabindex="0">Old</div></ark-collapsible-trigger>
      <ark-collapsible-content>Panel</ark-collapsible-content>
    </ark-collapsible>`)
  await expect(page.getByTestId('old')).toHaveAttribute('aria-expanded', 'false')
  const old = await page.evaluate(() => {
    const host = document.querySelector('ark-collapsible-trigger')!
    const previous = host.firstElementChild!
    const next = document.createElement('a')
    next.dataset.testid = 'new'
    next.href = '#'
    next.textContent = 'New'
    previous.replaceWith(next)
    Object.assign(window, { previous })
    return (previous as HTMLElement).dataset.testid
  })
  expect(old).toBe('old')
  const next = page.getByTestId('new')
  await expect(next).toHaveAttribute('aria-expanded', 'false')
  const stale = await page.evaluate(() => {
    const previous = (window as any).previous as HTMLElement
    return ['aria-expanded', 'aria-controls', 'data-collapsible-trigger', 'id'].filter((name) =>
      previous.hasAttribute(name),
    )
  })
  expect(stale).toEqual([])
  await next.click()
  await expect(next).toHaveAttribute('aria-expanded', 'true')
})

test('as-child lazily mounts template children into the child', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-collapsible>
      <ark-collapsible-trigger><button>Toggle</button></ark-collapsible-trigger>
      <ark-collapsible-content as-child><section><template><p>Lazy</p></template></section></ark-collapsible-content>
    </ark-collapsible>`)
  await expect(page.locator('section p')).toHaveCount(0)
  await page.getByRole('button', { name: 'Toggle' }).click()
  await expect(page.locator('section > p')).toHaveText('Lazy')
})

test('as-child menu items accept arbitrary elements and keep keyboard navigation', async ({ page }) => {
  await page.setContent(/* html */ `
    <ark-menu>
      <ark-menu-trigger><button>Open</button></ark-menu-trigger>
      <ark-menu-positioner>
        <ark-menu-content>
          <ark-menu-list>
            <ark-menu-item value="docs" as-child><a href="#docs">Docs</a></ark-menu-item>
            <ark-menu-item value="settings" as-child><div>Settings</div></ark-menu-item>
          </ark-menu-list>
        </ark-menu-content>
      </ark-menu-positioner>
    </ark-menu>`)
  await page.getByRole('button', { name: 'Open' }).click()
  const items = page.getByRole('menuitem')
  await expect(items).toHaveCount(2)
  await expect(page.locator('ark-menu-item > div')).toHaveAttribute('role', 'menuitem')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await expect(page.locator('ark-menu-item > div')).toHaveAttribute('data-highlighted', '')
})
