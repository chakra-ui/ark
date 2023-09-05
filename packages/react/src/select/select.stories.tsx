import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import { collection } from '@zag-js/select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
} from './'
import './select.css'

type SelectType = typeof Select

const meta: Meta<SelectType> = {
  title: 'Select',
  component: Select,
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
            {api.hasSelectedItems ? api.selectedItems[0].value : 'Select option'}
          </SelectTrigger>
          <Portal>
            <SelectPositioner>
              <SelectContent>
                <SelectItemGroup id="framework">
                  <SelectItemGroupLabel htmlFor="framework">Frameworks</SelectItemGroupLabel>
                  {items.toArray().map((item) => (
                    <SelectItem key={item.value} item={item}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectItemGroup>
              </SelectContent>
            </SelectPositioner>
          </Portal>
        </>
      )}
    </Select>
  )
}
