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
        <Menu.Item id="search">Search</Menu.Item>
        <Menu.Item id="undo">Undo</Menu.Item>
        <Menu.Item id="delivery" disabled>
          Delivery
        </Menu.Item>
        <Menu.Item id="unlink">Unlink</Menu.Item>
        <Menu.Separator />
        <Menu.ItemGroup id="radio-group">
          <Menu.ItemGroupLabel htmlFor="radio-group">Radio Group</Menu.ItemGroupLabel>
          <Menu.OptionItem name="framework" type="radio" value="react">
            <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
            <Menu.OptionItemText>React</Menu.OptionItemText>
          </Menu.OptionItem>
          <Menu.OptionItem name="framework" type="radio" value="solid">
            <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
            <Menu.OptionItemText>Solid</Menu.OptionItemText>
          </Menu.OptionItem>
          <Menu.OptionItem name="framework" type="radio" value="vue">
            <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
            <Menu.OptionItemText>Vue</Menu.OptionItemText>
          </Menu.OptionItem>
        </Menu.ItemGroup>
        <Menu.Root>
          <Menu.TriggerItem>Share &gt;</Menu.TriggerItem>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item id="twitter">Twitter</Menu.Item>
              <Menu.Item id="message">Message</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
