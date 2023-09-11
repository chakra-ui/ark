import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxTrigger,
} from '.'
import { ComboboxItemIndicator } from './combobox-item-indicator'
import './combobox.css'

const meta: Meta = {
  title: 'Combobox',
}

export default meta

export const Basic = () => {
  const items = ['React', 'Solid', 'Vue']
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
              <For each={items}>
                {(item) => (
                  <ComboboxItem item={item}>
                    <ComboboxItemText>{item}</ComboboxItemText>
                    <ComboboxItemIndicator>✓</ComboboxItemIndicator>
                  </ComboboxItem>
                )}
              </For>
            </ComboboxItemGroup>
          </ComboboxContent>
        </ComboboxPositioner>
      </Portal>
    </Combobox>
  )
}
