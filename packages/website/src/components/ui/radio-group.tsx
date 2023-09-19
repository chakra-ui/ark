import * as Ark from '@ark-ui/react/radio-group'
import { styled } from 'styled-system/jsx'
import { radioGroup, type RadioGroupVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(radioGroup)

export * from '@ark-ui/react/radio-group'
export type RadioGroupProps = Ark.RadioGroupProps & RadioGroupVariantProps

const RadioGroupRoot = withProvider(styled(Ark.RadioGroup.Root), 'root')
export const RadioGroupLabel = withContext(styled(Ark.RadioGroup.Label), 'label')
export const Radio = withContext(styled(Ark.RadioGroup.Radio), 'radio')
export const RadioLabel = withContext(styled(Ark.RadioGroup.RadioLabel), 'radioLabel')
export const RadioControl = withContext(styled(Ark.RadioGroup.RadioControl), 'radioControl')

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Label: RadioGroupLabel,
  Radio: Radio,
  RadioLabel: RadioLabel,
  RadioControl: RadioControl,
})
