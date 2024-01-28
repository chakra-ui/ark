import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Menu } from '../'

export const OptionGroupsComponentUnderTest = () => {
  const [value, setValue] = createSignal<Record<string, string | string[]>>({
    framework: '',
    libraries: [],
  })
  return (
    <Menu.Root
      value={value()}
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
              <Menu.ItemGroupLabel for="radio-group">Radio Group</Menu.ItemGroupLabel>
              <Menu.OptionItem name="framework" type="radio" value="react">
                {(api) => <>{api().isChecked ? '✅' : ''} React</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="framework" type="radio" value="solid">
                {(api) => <>{api().isChecked ? '✅' : ''} Solid</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="framework" type="radio" value="vue">
                {(api) => <>{api().isChecked ? '✅' : ''} Vue</>}
              </Menu.OptionItem>
            </Menu.ItemGroup>
            <Menu.ItemGroup id="checkbox-group">
              <Menu.ItemGroupLabel for="checkbox-group">Checkbox Group</Menu.ItemGroupLabel>
              <Menu.OptionItem name="libraries" type="checkbox" value="zag-js">
                {(api) => <>{api().isChecked ? '✅' : ''} zag-js</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="ark">
                {(api) => <>{api().isChecked ? '✅' : ''} ark</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="panda">
                {(api) => <>{api().isChecked ? '✅' : ''} panda</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="chakra">
                {(api) => <>{api().isChecked ? '✅' : ''} chakra</>}
              </Menu.OptionItem>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
