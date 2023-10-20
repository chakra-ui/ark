import { Portal } from '@ark-ui/react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'
import {
  Combobox,
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
} from '~/components/ui/combobox'
import { Input } from '~/components/ui/input'
import { Button } from '../components/ui/button'

const data = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte', disabled: true },
  { label: 'Vue', value: 'vue' },
]

export const ComboboxDemo = () => {
  const [items, setItems] = useState(data)

  const handleChange = (e: any) => {
    const filtered = data.filter((item) => item.label.toLowerCase().includes(e.value.toLowerCase()))
    setItems(filtered.length > 0 ? filtered : data)
  }

  return (
    <Combobox width="2xs" onInputValueChange={handleChange} items={items}>
      <ComboboxLabel>Framework</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="Select a Framework" asChild>
          <Input />
        </ComboboxInput>
        <ComboboxTrigger asChild>
          <Button variant="link" aria-label="open" size="xs" px="0">
            <ChevronsUpDownIcon />
          </Button>
        </ComboboxTrigger>
      </ComboboxControl>
      <Portal>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxItemGroup id="framework">
              <ComboboxItemGroupLabel htmlFor="framework">Frameworks</ComboboxItemGroupLabel>
              {items.map((item) => (
                <ComboboxItem key={item.value} item={item}>
                  <ComboboxItemText>{item.label}</ComboboxItemText>
                  <ComboboxItemIndicator>
                    <CheckIcon />
                  </ComboboxItemIndicator>
                </ComboboxItem>
              ))}
            </ComboboxItemGroup>
          </ComboboxContent>
        </ComboboxPositioner>
      </Portal>
    </Combobox>
  )
}
