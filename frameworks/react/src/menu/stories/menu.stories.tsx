import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Menu } from '../'
import './menu.css'

const meta: Meta = {
  title: 'Components / Menu / Menu',
}

export default meta

export const Basic = () => (
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
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Trigger from the outside</button>
      <Menu.Root open={isOpen} onSelect={(id) => console.log(id)}>
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

export const Group = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel>JS Frameworks</Menu.ItemGroupLabel>
          <Menu.Item value="react">React</Menu.Item>
          <Menu.Item value="solid">Solid</Menu.Item>
          <Menu.Item value="vue">Vue</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel>CSS Frameworks</Menu.ItemGroupLabel>
          <Menu.Item value="panda">Panda</Menu.Item>
          <Menu.Item value="tailwind">Tailwind</Menu.Item>
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const Separator = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="react">React</Menu.Item>
        <Menu.Item value="solid">Solid</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="vue">Vue</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const Checkbox = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Menu.Root>
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.CheckboxItem checked={checked} onCheckedChange={setChecked} value="checked">
            <Menu.ItemIndicator>✅</Menu.ItemIndicator>
            <Menu.ItemText>Check me</Menu.ItemText>
          </Menu.CheckboxItem>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const RadioGroup = () => {
  const [value, setValue] = useState('React')

  return (
    <Menu.Root>
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.RadioItemGroup value={value} onValueChange={(e) => setValue(e.value)}>
            <Menu.ItemGroupLabel>JS Frameworks</Menu.ItemGroupLabel>
            {['React', 'Solid', 'Vue'].map((framework) => (
              <Menu.RadioItem key={framework} value={framework}>
                <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                <Menu.ItemText>{framework}</Menu.ItemText>
              </Menu.RadioItem>
            ))}
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const RenderProp = () => (
  <Menu.Root>
    <Menu.Context>
      {(menu) => <Menu.Trigger>Menu is {menu.isOpen ? 'open' : 'closed'}</Menu.Trigger>}
    </Menu.Context>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="react">
          <Menu.ItemContext>
            {(menuItem) => (
              <>React is {menuItem.isHighlighted ? 'highlighted' : 'not highlighted'}</>
            )}
          </Menu.ItemContext>
        </Menu.Item>
        <Menu.Item value="solid">Solid</Menu.Item>
        <Menu.Item value="vue">Vue</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
