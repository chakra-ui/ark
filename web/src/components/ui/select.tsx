import * as Ark from '@ark-ui/react/src/select'
import { styled } from 'styled-system/jsx'
import { select, type SelectVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(select)

export * from '@ark-ui/react/src/select'
export type SelectProps = Ark.SelectProps & SelectVariantProps

const SelectRoot = withProvider(styled(Ark.Select.Root), 'root')
export const SelectContent = withContext(styled(Ark.Select.Content), 'content')
export const SelectLabel = withContext(styled(Ark.Select.Label), 'label')
export const SelectOption = withContext(styled(Ark.Select.Option), 'option')
export const SelectOptionGroup = withContext(styled(Ark.Select.OptionGroup), 'optionGroup')
export const SelectOptionGroupLabel = withContext(
  styled(Ark.Select.OptionGroupLabel),
  'optionGroupLabel',
)
export const SelectPositioner = withContext(styled(Ark.Select.Positioner), 'positioner')
export const SelectTrigger = withContext(styled(Ark.Select.Trigger), 'trigger')

export const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Content: SelectContent,
  Label: SelectLabel,
  Option: SelectOption,
  OptionGroup: SelectOptionGroup,
  OptionGroupLabel: SelectOptionGroupLabel,
  Positioner: SelectPositioner,
  Trigger: SelectTrigger,
})
