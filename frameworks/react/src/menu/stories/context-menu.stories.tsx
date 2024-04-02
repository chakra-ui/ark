import type { Meta } from '@storybook/react'
import { Menu } from '../'
import './menu.css'

const meta: Meta = {
  title: 'Components / Menu / Context',
}

export default meta

export const Basic = () => (
  <Menu.Root onHighlightChange={(e) => console.log(e)}>
    <Menu.ContextTrigger>
      <div style={{ width: '100%', height: '20rem', border: '1px solid lightgray' }}>
        Some content
      </div>
    </Menu.ContextTrigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="search">Search</Menu.Item>
        <Menu.Item value="undo">Undo</Menu.Item>
        <Menu.Item value="delivery" disabled>
          Delivery
        </Menu.Item>
        <Menu.Item value="unlink">Unlink</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
