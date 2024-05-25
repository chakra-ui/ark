import { Index, createSignal } from 'solid-js'
import { Menu } from '../..'

export const RadioGroup = () => {
  const [value, setValue] = createSignal('React')

  return (
    <Menu.Root>
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.RadioItemGroup value={value()} onValueChange={(e) => setValue(e.value)}>
            <Menu.ItemGroupLabel>JS Frameworks</Menu.ItemGroupLabel>
            <Index each={['React', 'Solid', 'Svelte', 'Vue']}>
              {(framework) => (
                <Menu.RadioItem value={framework()} disabled={framework() === 'Svelte'}>
                  <Menu.ItemIndicator>✅</Menu.ItemIndicator>
                  <Menu.ItemText>{framework()}</Menu.ItemText>
                </Menu.RadioItem>
              )}
            </Index>
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
