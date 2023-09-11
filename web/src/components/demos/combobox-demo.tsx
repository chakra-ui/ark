import { Portal } from '@ark-ui/react'
import { ChevronsUpDown } from 'lucide-react'
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxPositioner,
  ComboboxTrigger,
} from '~/components/ui/combobox'
import { IconButton } from '~/components/ui/icon-button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export const ComboboxDemo = () => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]

  return (
    <Combobox items={items}>
      <ComboboxLabel asChild>
        <Label>JS Frameworks</Label>
      </ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput asChild>
          <Input />
        </ComboboxInput>
        <ComboboxTrigger asChild>
          <IconButton variant="link" aria-label="open" size="sm">
            <ChevronsUpDown />
          </IconButton>
        </ComboboxTrigger>
      </ComboboxControl>
      <Portal>
        <ComboboxPositioner>
          <ComboboxContent>
            {items.map((item) => (
              <ComboboxItem key={item.value} item={item}>
                <ComboboxItemText>{item.label}</ComboboxItemText>
                <ComboboxItemIndicator>✓</ComboboxItemIndicator>
              </ComboboxItem>
            ))}
          </ComboboxContent>
        </ComboboxPositioner>
      </Portal>
    </Combobox>
  )
}
