import * as Ark from '@ark-ui/react/src/radio-group'
import { styled } from 'styled-system/jsx'
import { radioGroup, type RadioGroupVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(radioGroup)

export * from '@ark-ui/react/src/radio-group'
export type RadioGroupProps = Ark.RadioGroupProps & RadioGroupVariantProps

const RadioGroupRoot = withProvider(styled(Ark.RadioGroup.Root), 'root')
export const RadioGroupLabel = withContext(styled(Ark.RadioGroup.Label), 'label')
export const RadioGroupItem = withContext(styled(Ark.RadioGroup.Item), 'radio')
export const RadioGroupItemText = withContext(styled(Ark.RadioGroup.ItemText), 'radioLabel')
export const RadioGroupItemControl = withContext(styled(Ark.RadioGroup.ItemControl), 'radioControl')

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
  ItemControl: RadioGroupItemControl,
  ItemText: RadioGroupItemText,
  Label: RadioGroupLabel,
})
