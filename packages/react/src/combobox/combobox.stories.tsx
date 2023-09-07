import type { Meta } from '@storybook/react'
import { Portal } from '..'
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxTrigger,
} from './'
import './combobox.css'

type ComboboxType = typeof Combobox

const meta: Meta<ComboboxType> = {
  title: 'Combobox',
  component: Combobox,
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
    <Combobox items={items}>
      <ComboboxLabel>Framework</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger>Open</ComboboxTrigger>
        <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
      </ComboboxControl>
      <Portal>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxItemGroup id="framework">
              <ComboboxItemGroupLabel htmlFor="framework">Frameworks</ComboboxItemGroupLabel>
              {items.map((item) => (
                <ComboboxItem key={item.value} item={item}>
                  <ComboboxItemText>{item.label}</ComboboxItemText>
                  <ComboboxItemIndicator>✓</ComboboxItemIndicator>
                </ComboboxItem>
              ))}
            </ComboboxItemGroup>
          </ComboboxContent>
        </ComboboxPositioner>
      </Portal>
    </Combobox>
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
    <Combobox items={items} multiple>
      <ComboboxLabel>Framework</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger>Open</ComboboxTrigger>
        <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
      </ComboboxControl>
      <Portal>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxItemGroup id="framework">
              <ComboboxItemGroupLabel htmlFor="framework">Frameworks</ComboboxItemGroupLabel>
              {items.map((item) => (
                <ComboboxItem key={item.value} item={item}>
                  <ComboboxItemText>{item.label}</ComboboxItemText>
                  <ComboboxItemIndicator>✓</ComboboxItemIndicator>
                </ComboboxItem>
              ))}
            </ComboboxItemGroup>
          </ComboboxContent>
        </ComboboxPositioner>
      </Portal>
    </Combobox>
  )
}
