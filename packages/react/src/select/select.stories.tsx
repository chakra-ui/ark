import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
} from './'
import { SelectControl } from './select-control'
import { SelectValue } from './select-value'
import './select.css'

type SelectType = typeof Select

const meta: Meta<SelectType> = {
  title: 'Select',
  component: Select,
}

export default meta

export const Basic = () => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select items={items} onChange={(e) => console.log(e.items)}>
      <SelectLabel>Framework:</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a Framework" />
        </SelectTrigger>
        <SelectClearTrigger>Clear</SelectClearTrigger>
      </SelectControl>
      <Portal>
        <SelectPositioner>
          <SelectContent>
            <SelectItemGroup id="framework">
              <SelectItemGroupLabel htmlFor="framework">Frameworks</SelectItemGroupLabel>
              {items.map((item) => (
                <SelectItem key={item.value} item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator>✓</SelectItemIndicator>
                </SelectItem>
              ))}
            </SelectItemGroup>
          </SelectContent>
        </SelectPositioner>
      </Portal>
    </Select>
  )
}

export const Multiple = () => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select items={items} multiple>
      <SelectLabel>Framework:</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a Framework" />
        </SelectTrigger>
        <SelectClearTrigger>Clear</SelectClearTrigger>
      </SelectControl>
      <Portal>
        <SelectPositioner>
          <SelectContent>
            <SelectItemGroup id="framework">
              <SelectItemGroupLabel htmlFor="framework">Frameworks</SelectItemGroupLabel>
              {items.map((item) => (
                <SelectItem key={item.value} item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator>✓</SelectItemIndicator>
                </SelectItem>
              ))}
            </SelectItemGroup>
          </SelectContent>
        </SelectPositioner>
      </Portal>
    </Select>
  )
}

// type Item = {
//   name: string
//   value: string
// }

// export const Controlled = () => {
//   const [selectedItems, setSelectedItems] = useState<Item[]>([])

//   const items = [
//     { name: 'React', value: 'react' },
//     { name: 'Solid', value: 'solid' },
//     { name: 'Vue', value: 'vue' },
//   ]

//   return (
//     <>
//       <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
//       <Select items={items} multiple onChange={(e) => setSelectedItems(e.items)}>
//         {(api) => (
//           <>
//             <SelectLabel>Framework:</SelectLabel>
//             <SelectTrigger>{api.valueAsString || 'Select option'}</SelectTrigger>
//             <SelectClearTrigger>Clear</SelectClearTrigger>
//             <Portal>
//               <SelectPositioner>
//                 <SelectContent>
//                   <SelectItemGroup id="framework">
//                     <SelectItemGroupLabel htmlFor="framework">Frameworks</SelectItemGroupLabel>
//                     {items.map((item) => (
//                       <SelectItem key={item.value} item={item}>
//                         {item.name}
//                       </SelectItem>
//                     ))}
//                   </SelectItemGroup>
//                 </SelectContent>
//               </SelectPositioner>
//             </Portal>
//           </>
//         )}
//       </Select>
//     </>
//   )
// }

// export const StringItems = () => {
//   const items = ['React', 'Solid', 'Vue']
//   return (
//     <Select items={items} onChange={(e) => console.log(e.items, e.value)}>
//       {(api) => (
//         <>
//           <SelectLabel>Framework:</SelectLabel>
//           <SelectTrigger>{api.valueAsString || 'Select option'}</SelectTrigger>
//           <SelectClearTrigger>Clear</SelectClearTrigger>
//           <Portal>
//             <SelectPositioner>
//               <SelectContent>
//                 <SelectItemGroup id="framework">
//                   <SelectItemGroupLabel htmlFor="framework">Frameworks</SelectItemGroupLabel>
//                   {items.map((item) => (
//                     <SelectItem key={item} item={item}>
//                       {item}
//                     </SelectItem>
//                   ))}
//                 </SelectItemGroup>
//               </SelectContent>
//             </SelectPositioner>
//           </Portal>
//         </>
//       )}
//     </Select>
//   )
// }

// export const ItemsWithoutValue = () => {
//   const items = [
//     { framework: 'React', stars: '100' },
//     { framework: 'Solid', stars: '30' },
//     { framework: 'Vue', stars: '1' },
//     { framework: 'Svelte', stars: '40', disabled: true },
//   ]
//   return (
//     <Select
//       items={items}
//       itemToValue={(item) => item.framework}
//       itemToString={(item) => `${item.framework} (${item.stars})`}
//       isItemDisabled={(item) => (item.disabled ? true : false)}
//     >
//       {(api) => (
//         <>
//           <SelectLabel>Framework:</SelectLabel>
//           <SelectTrigger>{api.valueAsString || 'Select option'}</SelectTrigger>
//           <SelectClearTrigger>Clear</SelectClearTrigger>
//           <Portal>
//             <SelectPositioner>
//               <SelectContent>
//                 <SelectItemGroup id="framework">
//                   <SelectItemGroupLabel htmlFor="framework">Frameworks</SelectItemGroupLabel>
//                   {items.map((item) => (
//                     <SelectItem key={item.framework} item={item}>
//                       {item.framework} ({item.stars})
//                     </SelectItem>
//                   ))}
//                 </SelectItemGroup>
//               </SelectContent>
//             </SelectPositioner>
//           </Portal>
//         </>
//       )}
//     </Select>
//   )
// }
