import { collection } from '@zag-js/select'
import { For, Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
} from '.'
import './select.css'

const meta: Meta = {
  title: 'Select',
}

export default meta

export const Basic = () => {
  const items = collection({ items: [{ value: 'React' }, { value: 'Solid' }, { value: 'Vue' }] })

  return (
    <Select collection={items}>
      {(api) => (
        <>
          <SelectLabel>Framework:</SelectLabel>
          <SelectTrigger>
            {api().hasSelectedItems ? api().selectedItems[0].value : 'Select option'}
          </SelectTrigger>
          <Portal>
            <SelectPositioner>
              <SelectContent>
                <SelectItemGroup id="framework">
                  <SelectItemGroupLabel htmlFor="framework">Frameworks</SelectItemGroupLabel>
                  <For each={items.toArray()}>
                    {(item) => <SelectItem item={item}>{item.value}</SelectItem>}
                  </For>
                </SelectItemGroup>
              </SelectContent>
            </SelectPositioner>
          </Portal>
        </>
      )}
    </Select>
  )
}
