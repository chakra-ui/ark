import * as Ark from '@ark-ui/react/combobox'
import { styled } from 'styled-system/jsx'
import { combobox, type ComboboxVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(combobox)

export * from '@ark-ui/react/combobox'
export type ComboboxProps<T extends Ark.CollectionItem> = Ark.ComboboxProps<T> &
  ComboboxVariantProps

const ComboboxRoot = withProvider(styled(Ark.Combobox.Root), 'root')
export const ComboboxClearTrigger = withContext(styled(Ark.Combobox.ClearTrigger), 'clearTrigger')
export const ComboboxContent = withContext(styled(Ark.Combobox.Content), 'content')
export const ComboboxControl = withContext(styled(Ark.Combobox.Control), 'control')
export const ComboboxInput = withContext(styled(Ark.Combobox.Input), 'input')
export const ComboboxItem = withContext(styled(Ark.Combobox.Item), 'item')
export const ComboboxItemGroup = withContext(styled(Ark.Combobox.ItemGroup), 'itemGroup')
export const ComboboxItemGroupLabel = withContext(
  styled(Ark.Combobox.ItemGroupLabel),
  'itemGroupLabel',
)
export const ComboboxItemIndicator = withContext(
  styled(Ark.Combobox.ItemIndicator),
  'itemIndicator',
)
export const ComboboxItemText = withContext(styled(Ark.Combobox.ItemText), 'itemText')
export const ComboboxLabel = withContext(styled(Ark.Combobox.Label), 'label')
export const ComboboxPositioner = withContext(styled(Ark.Combobox.Positioner), 'positioner')
export const ComboboxTrigger = withContext(styled(Ark.Combobox.Trigger), 'trigger')

export const Combobox = Object.assign(ComboboxRoot, {
  Root: ComboboxRoot,
  ClearTrigger: ComboboxClearTrigger,
  Content: ComboboxContent,
  Control: ComboboxControl,
  Input: ComboboxInput,
  Item: ComboboxItem,
  ItemGroup: ComboboxItemGroup,
  ItemGroupLabel: ComboboxItemGroupLabel,
  ItemIndicator: ComboboxItemIndicator,
  ItemText: ComboboxItemText,
  Label: ComboboxLabel,
  Positioner: ComboboxPositioner,
  Trigger: ComboboxTrigger,
})
