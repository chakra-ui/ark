import * as Ark from '@ark-ui/react/src/radio-group'
import { styled } from 'styled-system/jsx'
import { radioGroup, type RadioGroupVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(radioGroup)

export * from '@ark-ui/react/src/radio-group'
export type RadioGroupProps = Ark.RadioGroupProps & RadioGroupVariantProps

const RadioGroupRoot = withProvider(styled(Ark.RadioGroup.Root), 'root')
export const RadioGroupIndicator = withContext(styled(Ark.RadioGroup.Indicator), 'indicator')
export const RadioGroupItem = withContext(styled(Ark.RadioGroup.Item), 'item')
export const RadioGroupItemControl = withContext(styled(Ark.RadioGroup.ItemControl), 'itemControl')
export const RadioGroupItemText = withContext(styled(Ark.RadioGroup.ItemText), 'itemText')
export const RadioGroupLabel = withContext(styled(Ark.RadioGroup.Label), 'label')

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Indicator: RadioGroupIndicator,
  Item: RadioGroupItem,
  ItemControl: RadioGroupItemControl,
  ItemText: RadioGroupItemText,
  Label: RadioGroupLabel,
})
