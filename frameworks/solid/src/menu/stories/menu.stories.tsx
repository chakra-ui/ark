import { createSignal } from 'solid-js'
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

// export const Checkbox = () => {
//   const [checked, setChecked] = createSignal(false)

//   return (
//     <Menu.Root>
//       <Menu.Trigger>Open menu</Menu.Trigger>
//       <Menu.Positioner>
//         <Menu.Content>
//           <Menu.CheckboxItem checked={checked()} onCheckedChange={setChecked} value="checked">
//             <Menu.ItemIndicator>✅</Menu.ItemIndicator>
//             <Menu.ItemText>Check me</Menu.ItemText>
//           </Menu.CheckboxItem>
//         </Menu.Content>
//       </Menu.Positioner>
//     </Menu.Root>
//   )
// }

// export const Options = () => {
//   const [value, setValue] = createSignal<Record<string, string | string[]>>({
//     framework: '',
//     libraries: [],
//   })
//   return (
//     <Menu.Root
//       value={value()}
//       onValueChange={(data) => {
//         setValue((prev) => ({
//           ...prev,
//           [data.name]: data.value,
//         }))
//       }}
//     >
//       <Menu.Trigger>Open Menu</Menu.Trigger>{' '}
//       <Menu.Positioner>
//         <Menu.Content>
//           <Menu.ItemGroup id="radio-group">
//             <Menu.ItemGroupLabel for="radio-group">Radio Group</Menu.ItemGroupLabel>
//             <Menu.OptionItem name="framework" type="radio" value="react">
//               <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
//               <Menu.OptionItemText>React</Menu.OptionItemText>
//             </Menu.OptionItem>
//             <Menu.OptionItem name="framework" type="radio" value="solid">
//               <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
//               <Menu.OptionItemText>Solid</Menu.OptionItemText>
//             </Menu.OptionItem>
//             <Menu.OptionItem name="framework" type="radio" value="vue">
//               <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
//               <Menu.OptionItemText>Vue</Menu.OptionItemText>
//             </Menu.OptionItem>
//           </Menu.ItemGroup>
//           <Menu.ItemGroup id="checkbox-group">
//             <Menu.ItemGroupLabel for="checkbox-group">Checkbox Group</Menu.ItemGroupLabel>
//             <Menu.OptionItem name="libraries" type="checkbox" value="zag-js">
//               <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
//               <Menu.OptionItemText>Zag.js</Menu.OptionItemText>
//             </Menu.OptionItem>
//             <Menu.OptionItem name="libraries" type="checkbox" value="ark">
//               <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
//               <Menu.OptionItemText>Ark UI</Menu.OptionItemText>
//             </Menu.OptionItem>
//             <Menu.OptionItem name="libraries" type="checkbox" value="panda">
//               <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
//               <Menu.OptionItemText>Panda CSS</Menu.OptionItemText>
//             </Menu.OptionItem>
//             <Menu.OptionItem name="libraries" type="checkbox" value="chakra">
//               <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
//               <Menu.OptionItemText>Chakra UI</Menu.OptionItemText>
//             </Menu.OptionItem>
//           </Menu.ItemGroup>
//         </Menu.Content>
//       </Menu.Positioner>
//     </Menu.Root>
//   )
// }
