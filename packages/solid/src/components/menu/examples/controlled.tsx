import { createSignal } from 'solid-js'
import { Menu } from '../..'

export const Controlled = () => {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(!isOpen())}>
        Trigger from the outside
      </button>
      <Menu.Root open={isOpen()} onSelect={(id) => console.log(id)}>
        <Menu.Trigger>
          Open menu <Menu.Indicator>➡️</Menu.Indicator>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="react">React</Menu.Item>
            <Menu.Item value="solid">Solid</Menu.Item>
            <Menu.Item value="vue">Vue</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </>
  )
}
