import * as Ark from '@ark-ui/react/src/combobox'
import { styled } from 'styled-system/jsx'
import { combobox, type ComboboxVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(combobox)

export * from '@ark-ui/react/src/combobox'
export type ComboboxProps = Ark.ComboboxProps & ComboboxVariantProps

const ComboboxRoot = withProvider(styled(Ark.Combobox.Root), 'root')
export const ComboboxClearTrigger = withContext(styled(Ark.Combobox.ClearTrigger), 'clearTrigger')
export const ComboboxContent = withContext(styled(Ark.Combobox.Content), 'content')
export const ComboboxControl = withContext(styled(Ark.Combobox.Control), 'control')
export const ComboboxInput = withContext(styled(Ark.Combobox.Input), 'input')
export const ComboboxLabel = withContext(styled(Ark.Combobox.Label), 'label')
export const ComboboxOption = withContext(styled(Ark.Combobox.Option), 'option')
export const ComboboxOptionGroup = withContext(styled(Ark.Combobox.OptionGroup), 'optionGroup')
export const ComboboxOptionGroupLabel = withContext(
  styled(Ark.Combobox.OptionGroupLabel),
  'optionGroupLabel',
)
export const ComboboxPositioner = withContext(styled(Ark.Combobox.Positioner), 'positioner')
export const ComboboxTrigger = withContext(styled(Ark.Combobox.Trigger), 'trigger')

export const Combobox = Object.assign(ComboboxRoot, {
  Root: ComboboxRoot,
  ClearTrigger: ComboboxClearTrigger,
  Content: ComboboxContent,
  Control: ComboboxControl,
  Input: ComboboxInput,
  Label: ComboboxLabel,
  Option: ComboboxOption,
  OptionGroup: ComboboxOptionGroup,
  OptionGroupLabel: ComboboxOptionGroupLabel,
  Positioner: ComboboxPositioner,
  Trigger: ComboboxTrigger,
})
