import { Menu } from '@ark-ui/solid/menu'
import { createSignal } from 'solid-js'

export const Checkbox = () => {
  const [checked, setChecked] = createSignal(true)

  return (
    <Menu.Root>
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.CheckboxItem checked={checked()} onCheckedChange={setChecked} value="checked">
            <Menu.ItemIndicator>✅</Menu.ItemIndicator>
            <Menu.ItemText>Check me</Menu.ItemText>
          </Menu.CheckboxItem>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
