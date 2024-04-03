import { Menu } from '../'
import { Portal } from '../../portal'

export const OptionGroupsComponentUnderTest = () => {
  return (
    <Menu.Root>
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          {/* <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Radio Group</Menu.ItemGroupLabel>
              <Menu.OptionItem type="radio" value="react" checked>
                <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                <Menu.ItemText>React</Menu.ItemText>
              </Menu.OptionItem>
              <Menu.OptionItem type="radio" value="solid" checked>
                <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                <Menu.ItemText>Solid</Menu.ItemText>
              </Menu.OptionItem>
              <Menu.OptionItem type="radio" value="vue" checked>
                <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                <Menu.ItemText>Vue</Menu.ItemText>
              </Menu.OptionItem>
            </Menu.ItemGroup>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Checkbox Group</Menu.ItemGroupLabel>
              <Menu.CheckboxItem value="zag-js" checked>
                <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                <Menu.ItemText>Zag.js</Menu.ItemText>
              </Menu.OptionItem>
              <Menu.CheckboxItem value="ark" checked>
                <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                <Menu.ItemText>Ark UI</Menu.ItemText>
              </Menu.OptionItem>
              <Menu.CheckboxItem value="panda" checked>
                <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                <Menu.ItemText>Panda CSS</Menu.ItemText>
              </Menu.OptionItem>
              <Menu.CheckboxItem value="chakra" checked>
                <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                <Menu.ItemText>Chakra UI</Menu.ItemText>
              </Menu.OptionItem>
            </Menu.ItemGroup>
          </Menu.Content> */}
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
