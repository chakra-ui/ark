import { Index, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Menu } from '../'
import './menu.css'

const meta: Meta = {
  title: 'Components / Menu / Menu',
}

export default meta

export const Basic = () => (
  <Menu.Root>
    <Menu.Trigger>
      Open menu <Menu.Indicator>➡️</Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="react">React</Menu.Item>
        <Menu.Item value="solid">Solid</Menu.Item>
        <Menu.Item value="vue">Vue</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen())}>Trigger from the outside</button>
      <Menu.Root open={isOpen()} onSelect={(id) => console.log(id)}>
        <Menu.Trigger>
          Open menu <Menu.Indicator>➡️</Menu.Indicator>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="react">React</Menu.Item>
            <Menu.Item value="solid">Solid</Menu.Item>
            <Menu.Item value="vue">Vue</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </>
  )
}

export const Group = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel>JS Frameworks</Menu.ItemGroupLabel>
          <Menu.Item value="react">React</Menu.Item>
          <Menu.Item value="solid">Solid</Menu.Item>
          <Menu.Item value="vue">Vue</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel>CSS Frameworks</Menu.ItemGroupLabel>
          <Menu.Item value="panda">Panda</Menu.Item>
          <Menu.Item value="tailwind">Tailwind</Menu.Item>
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const Separator = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="react">React</Menu.Item>
        <Menu.Item value="solid">Solid</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="vue">Vue</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

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
                  <Menu.ItemText>{framework}</Menu.ItemText>
                </Menu.RadioItem>
              )}
            </Index>
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const RenderProp = () => (
  <Menu.Root>
    <Menu.Context>
      {(context) => <Menu.Trigger>Menu is {context().isOpen ? 'open' : 'closed'}</Menu.Trigger>}
    </Menu.Context>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="react">React</Menu.Item>
        <Menu.Item value="solid">
          <Menu.ItemContext>
            {(context) => (
              <>Solid is {context().isHighlighted ? 'highlighted' : 'not highlighted'}</>
            )}
          </Menu.ItemContext>
        </Menu.Item>
        <Menu.Item value="vue">Vue</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
