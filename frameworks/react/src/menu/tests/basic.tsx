import { Menu, type MenuRootProps } from '../'

export const ComponentUnderTest = (props: MenuRootProps) => (
  <Menu.Root {...props}>
    <Menu.Trigger>
      Open menu <Menu.Indicator />
    </Menu.Trigger>
    <Menu.ContextTrigger>Context trigger</Menu.ContextTrigger>
    <Menu.Positioner data-testid="positioner">
      <Menu.Content>
        <Menu.Arrow>
          <Menu.ArrowTip />
        </Menu.Arrow>
        <span>main menu content</span>
        <Menu.Item value="search">Search</Menu.Item>
        <Menu.Item value="undo">Undo</Menu.Item>
        <Menu.Item value="delivery" disabled>
          Delivery
        </Menu.Item>
        <Menu.Item value="unlink">Unlink</Menu.Item>
        <Menu.Separator />
        <Menu.ItemGroup id="radio-group">
          <Menu.ItemGroupLabel htmlFor="radio-group">Radio Group</Menu.ItemGroupLabel>
          <Menu.OptionItem type="radio" value="react" checked>
            <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
            <Menu.OptionItemText>React</Menu.OptionItemText>
          </Menu.OptionItem>
          <Menu.OptionItem type="radio" value="solid" checked>
            <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
            <Menu.OptionItemText>Solid</Menu.OptionItemText>
          </Menu.OptionItem>
          <Menu.OptionItem type="radio" value="vue" checked>
            <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
            <Menu.OptionItemText>Vue</Menu.OptionItemText>
          </Menu.OptionItem>
        </Menu.ItemGroup>
        <Menu.Root>
          <Menu.TriggerItem>Share &gt;</Menu.TriggerItem>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="twitter">Twitter</Menu.Item>
              <Menu.Item value="message">Message</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
