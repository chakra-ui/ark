import type { Meta } from 'storybook-solidjs'
import { Menu } from '../'
import './menu.css'

const meta: Meta = {
  title: 'Components / Menu / Context',
}

export default meta

export const Basic = () => (
  <Menu.Root>
    <Menu.ContextTrigger>Right click me</Menu.ContextTrigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="react">React</Menu.Item>
        <Menu.Item value="solid">Solid</Menu.Item>
        <Menu.Item value="vue">Vue</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
