import { For, Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectControl,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from '.'
import './select.css'

const meta: Meta = {
  title: 'Select',
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
    <Select items={items}>
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
              <For each={items}>
                {(item) => (
                  <SelectItem item={item}>
                    <SelectItemText>{item.label}</SelectItemText>
                    <SelectItemIndicator>✓</SelectItemIndicator>
                  </SelectItem>
                )}
              </For>
            </SelectItemGroup>
          </SelectContent>
        </SelectPositioner>
      </Portal>
    </Select>
  )
}
