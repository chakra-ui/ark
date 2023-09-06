import { collection } from '@zag-js/combobox'
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
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxTrigger,
} from '.'
import './combobox.css'

const meta: Meta = {
  title: 'Combobox',
}

export default meta

export const Basic = () => {
  const frameworks = collection({
    items: [{ value: 'React' }, { value: 'Solid' }, { value: 'Vue' }],
  })

  return (
    <Combobox collection={frameworks}>
      <ComboboxLabel>JS Frameworks</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger>▼</ComboboxTrigger>
        <ComboboxClearTrigger>Clear</ComboboxClearTrigger>
      </ComboboxControl>
      <Portal>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxItemGroup id="framework">
              <ComboboxItemGroupLabel htmlFor="framework">Frameworks</ComboboxItemGroupLabel>
              <For each={frameworks.toArray()}>
                {(item) => <ComboboxItem item={item}>{item.value}</ComboboxItem>}
              </For>
            </ComboboxItemGroup>
          </ComboboxContent>
        </ComboboxPositioner>
      </Portal>
    </Combobox>
  )
}
