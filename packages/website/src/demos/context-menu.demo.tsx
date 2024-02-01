import { Menu } from '~/components/ui'

export const Demo = (props: Menu.RootProps) => {
  return (
    <Menu.Root {...props}>
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
}
