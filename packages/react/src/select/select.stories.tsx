import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import { useState } from 'react'
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
  const items = ['React', 'Solid', 'Vue']
  return (
    <Select items={items}>
      <SelectLabel>Framework</SelectLabel>
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
                <SelectItem key={item} item={item}>
                  <SelectItemText>{item}</SelectItemText>
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

export const Advanced = () => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select items={items} onChange={(e) => console.log(e.items)}>
      <SelectLabel>Framework</SelectLabel>
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

type Item = { label: string; value: string }

export const Controlled = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]

  return (
    <>
      <output>
        <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
      </output>
      <Select items={items} multiple onChange={(e) => setSelectedItems(e.items)}>
        <SelectLabel>Framework</SelectLabel>
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
    </>
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
      <SelectLabel>Framework</SelectLabel>
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
