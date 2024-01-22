import { Menu } from '@ark-ui/solid'
import { Title } from '@solidjs/meta'
import Counter from '~/components/Counter'

export default function Home() {
  return (
    <main>
      <Title>Ark UI | SolidStart Template</Title>
      <h1>Welcome to Ark UI!</h1>
      <Counter />
      <p>
        Visit{' '}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{' '}
        to learn how to build SolidStart apps.
      </p>
      <Menu.Root lazyMount unmountOnExit>
        <Menu.Trigger>Open menu</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item id="search">Search</Menu.Item>
            <Menu.Item id="undo">Undo</Menu.Item>
            <Menu.Item id="delivery" disabled>
              Delivery
            </Menu.Item>
            <Menu.Item id="unlink">Unlink</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </main>
  )
}
