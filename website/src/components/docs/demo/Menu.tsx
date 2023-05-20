import { Button } from '@/components/shared/Button'
import { Checkbox } from '@/components/shared/Checkbox'
import { Radio } from '@/components/shared/Radio'
import { menu } from '@/panda/recipes'
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuOptionItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
  Portal,
} from '@ark-ui/react'
import { panda } from 'panda/jsx/factory'
import { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'

export const DemoMenu = () => {
  const [value, setValue] = useState<Record<string, string | string[]>>({
    framework: '',
    libraries: [],
  })
  return (
    <Menu
      closeOnSelect={false}
      onValueChange={(data) => {
        setValue((prev) => ({
          ...prev,
          [data.name]: data.value,
        }))
      }}
      value={value}
    >
      <MenuTrigger asChild>
        <Button>Open menu</Button>
      </MenuTrigger>
      <Portal>
        <MenuPositioner className={menu()}>
          <MenuContent>
            <MenuItem id="new-tab">New Tab...</MenuItem>
            <MenuItem id="new-win">New Window...</MenuItem>
            <MenuItemGroup id="radio-group">
              <MenuItemGroupLabel htmlFor="radio-group">Radio Group</MenuItemGroupLabel>
              <MenuOptionItem name="framework" type="radio" value="react">
                {({ isActive }) => (
                  <Radio name="framework" defaultChecked={isActive}>
                    React
                  </Radio>
                )}
              </MenuOptionItem>
              <MenuOptionItem name="framework" type="radio" value="solid">
                {({ isActive }) => (
                  <Radio name="framework" defaultChecked={isActive}>
                    Solid
                  </Radio>
                )}
              </MenuOptionItem>
              <MenuOptionItem name="framework" type="radio" value="vue">
                {({ isActive }) => (
                  <Radio name="framework" defaultChecked={isActive}>
                    Vue
                  </Radio>
                )}
              </MenuOptionItem>
            </MenuItemGroup>

            <MenuItemGroup id="checkbox-group">
              <MenuItemGroupLabel htmlFor="checkbox-group">Checkbox Group</MenuItemGroupLabel>
              <MenuOptionItem name="libraries" type="checkbox" value="react-1">
                {({ isActive }) => <Checkbox checked={isActive}>React</Checkbox>}
              </MenuOptionItem>
              <MenuOptionItem name="libraries" type="checkbox" value="solid-1">
                {({ isActive }) => <Checkbox checked={isActive}>Solid</Checkbox>}
              </MenuOptionItem>
              <MenuOptionItem name="libraries" type="checkbox" value="vue-1">
                {({ isActive }) => <Checkbox checked={isActive}>Vue</Checkbox>}
              </MenuOptionItem>
            </MenuItemGroup>
            <MenuSeparator />
            <Menu closeOnSelect={false} positioning={{ placement: 'right-start' }}>
              <MenuTriggerItem>
                <panda.span flex="1">More options</panda.span>
                <FiChevronRight />
              </MenuTriggerItem>
              <Portal>
                <MenuPositioner className={menu()}>
                  <MenuContent>
                    <MenuItem id="twitter">Twitter</MenuItem>
                    <MenuItem id="message">Message</MenuItem>
                  </MenuContent>
                </MenuPositioner>
              </Portal>
            </Menu>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  )
}
