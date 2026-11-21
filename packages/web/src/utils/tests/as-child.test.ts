import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import '@ark-ui/web/collapsible'
import '@ark-ui/web/menu'
import '@ark-ui/web/tabs'

const user = userEvent.setup()

test('as-child moves part props onto the first element child', async () => {
  document.body.innerHTML = /* html */ `
    <ark-collapsible>
      <ark-collapsible-trigger as-child><div tabindex="0">Toggle</div></ark-collapsible-trigger>
      <ark-collapsible-content as-child><section>Panel</section></ark-collapsible-content>
    </ark-collapsible>`

  const trigger = document.querySelector<HTMLElement>('ark-collapsible-trigger > div')!
  const content = document.querySelector<HTMLElement>('ark-collapsible-content > section')!

  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'))
  expect(trigger).toHaveAttribute('data-collapsible-trigger')
  expect(document.querySelector('ark-collapsible-trigger')).not.toHaveAttribute('data-collapsible-trigger')
  expect(content).toHaveAttribute('data-collapsible-content')
  expect(content).not.toBeVisible()
  expect(getComputedStyle(document.querySelector('ark-collapsible-content')!).display).toBe('contents')

  await user.click(trigger)
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'))
  await waitFor(() => expect(content).toBeVisible())
})

test('as-child moves root props onto the first element child', async () => {
  document.body.innerHTML = /* html */ `
    <ark-tabs as-child default-value="a">
      <section>
        <ark-tabs-list>
          <ark-tabs-trigger value="a"><button>A</button></ark-tabs-trigger>
        </ark-tabs-list>
        <ark-tabs-content value="a">Panel A</ark-tabs-content>
      </section>
    </ark-tabs>`

  const tabs = document.querySelector('ark-tabs')!

  await waitFor(() => expect(document.querySelector('ark-tabs > section')).toHaveAttribute('data-tabs-root'))
  expect(tabs).not.toHaveAttribute('data-tabs-root')
  expect(getComputedStyle(tabs).display).toBe('contents')
})

test('as-child moves props to a replacement child and strips the old one', async () => {
  document.body.innerHTML = /* html */ `
    <ark-collapsible>
      <ark-collapsible-trigger as-child><div data-testid="old" tabindex="0">Old</div></ark-collapsible-trigger>
      <ark-collapsible-content>Panel</ark-collapsible-content>
    </ark-collapsible>`

  const previous = screen.getByTestId('old')
  await waitFor(() => expect(previous).toHaveAttribute('aria-expanded', 'false'))

  const next = document.createElement('a')
  next.dataset.testid = 'new'
  next.href = '#'
  next.textContent = 'New'
  previous.replaceWith(next)

  await waitFor(() => expect(next).toHaveAttribute('aria-expanded', 'false'))

  const stale = ['aria-expanded', 'aria-controls', 'data-collapsible-trigger', 'id'].filter((name) =>
    previous.hasAttribute(name),
  )
  expect(stale).toEqual([])

  await user.click(next)
  await waitFor(() => expect(next).toHaveAttribute('aria-expanded', 'true'))
})

test('as-child lazily mounts template children into the child', async () => {
  document.body.innerHTML = /* html */ `
    <ark-collapsible>
      <ark-collapsible-trigger><button>Toggle</button></ark-collapsible-trigger>
      <ark-collapsible-content as-child><section><template><p>Lazy</p></template></section></ark-collapsible-content>
    </ark-collapsible>`

  const button = await screen.findByRole('button', { name: 'Toggle' })
  await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'false'))
  expect(document.querySelectorAll('section p')).toHaveLength(0)

  await user.click(button)
  await waitFor(() => expect(document.querySelector('section > p')).toHaveTextContent('Lazy'))
})

test('as-child menu items accept arbitrary elements and keep keyboard navigation', async () => {
  document.body.innerHTML = /* html */ `
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
    </ark-menu>`

  const settings = document.querySelector('ark-menu-item > div')!

  await user.click(await screen.findByRole('button', { name: 'Open' }))
  await waitFor(() => expect(screen.getAllByRole('menuitem')).toHaveLength(2))
  expect(settings).toHaveAttribute('role', 'menuitem')
  await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus())

  await user.keyboard('{ArrowDown}')
  await user.keyboard('{ArrowDown}')
  await waitFor(() => expect(settings).toHaveAttribute('data-highlighted', ''))
})
