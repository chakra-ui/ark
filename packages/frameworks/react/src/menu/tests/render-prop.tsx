import { Menu } from '../'

export const RenderPropComponentUnderTest = () => (
  <Menu.Root>
    {({ isOpen }) => (
      <>
        <Menu.Trigger>{isOpen ? 'Close' : 'Open'} menu</Menu.Trigger>
        <Menu.Content>
          <Menu.Item id="download">Download</Menu.Item>
          <Menu.Item id="copy" onClick={() => alert('Kagebunshin')}>
            Create a Copy
          </Menu.Item>
        </Menu.Content>
      </>
    )}
  </Menu.Root>
)
