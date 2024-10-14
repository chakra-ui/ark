import { Menu, useMenu } from '@ark-ui/solid/menu'

export const RootProvider = () => {
  const menu = useMenu()

  return (
    <>
      <button onClick={() => menu.api().setHighlightedValue('solid')}>Highlight Solid</button>

      <Menu.Root>
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
