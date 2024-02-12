import { useState } from 'react'
import { Menu } from '../'
import { Portal } from '../../portal'

export const OptionGroupsComponentUnderTest = () => {
  const [value, setValue] = useState<Record<string, string | string[]>>({
    framework: '',
    libraries: [],
  })
  return (
    <Menu.Root
      value={value}
      onValueChange={(data) => {
        setValue((prev) => ({
          ...prev,
          [data.name]: data.value,
        }))
      }}
    >
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup id="radio-group">
              <Menu.ItemGroupLabel htmlFor="radio-group">Radio Group</Menu.ItemGroupLabel>
              <Menu.OptionItem name="framework" type="radio" value="react">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} React</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="framework" type="radio" value="solid">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} Solid</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="framework" type="radio" value="vue">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} Vue</>}
              </Menu.OptionItem>
            </Menu.ItemGroup>
            <Menu.ItemGroup id="checkbox-group">
              <Menu.ItemGroupLabel htmlFor="checkbox-group">Checkbox Group</Menu.ItemGroupLabel>
              <Menu.OptionItem name="libraries" type="checkbox" value="zag-js">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} zag-js</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="ark">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} ark</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="panda">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} panda</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="chakra">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} chakra</>}
              </Menu.OptionItem>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
