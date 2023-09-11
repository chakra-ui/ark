import * as Ark from '@ark-ui/react/src/select'
import { styled } from 'styled-system/jsx'
import { select, type SelectVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(select)

export * from '@ark-ui/react/src/select'
export type SelectProps<T extends Ark.CollectionItem> = Ark.SelectProps<T> & SelectVariantProps

const SelectRoot = withProvider(styled(Ark.Select.Root), 'root')
export const SelectClearTrigger = withContext(styled(Ark.Select.ClearTrigger), 'clearTrigger')
export const SelectContent = withContext(styled(Ark.Select.Content), 'content')
export const SelectControl = withContext(styled(Ark.Select.Control), 'control')
export const SelectItem = withContext(styled(Ark.Select.Item), 'item')
export const SelectItemGroup = withContext(styled(Ark.Select.ItemGroup), 'itemGroup')
export const SelectItemGroupLabel = withContext(styled(Ark.Select.ItemGroupLabel), 'itemGroupLabel')
export const SelectItemIndiciator = withContext(styled(Ark.Select.ItemText), 'itemIndicator')
export const SelectItemText = withContext(styled(Ark.Select.ItemText), 'itemText')
export const SelectLabel = withContext(styled(Ark.Select.Label), 'label')
export const SelectPositioner = withContext(styled(Ark.Select.Positioner), 'positioner')
export const SelectTrigger = withContext(styled(Ark.Select.Trigger), 'trigger')
export const Selectvalue = withContext(styled(Ark.Select.Value), 'value')

export const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  ItemGroup: SelectItemGroup,
  ItemGroupLabel: SelectItemGroupLabel,
  Positioner: SelectPositioner,
  Trigger: SelectTrigger,
})
