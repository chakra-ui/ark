import type { Meta } from 'storybook-solidjs'
import { Menu } from '../'
import './menu.css'

const meta: Meta = {
  title: 'Components / Menu / Context',
}

export default meta

export const Basic = () => (
  <Menu.Root>
    <Menu.ContextTrigger>
      <div style={{ width: '100%', height: '20rem', border: '1px solid lightgray' }}>
        Some content
      </div>
    </Menu.ContextTrigger>
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
)
