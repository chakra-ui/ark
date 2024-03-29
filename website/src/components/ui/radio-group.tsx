import { RadioGroup } from '@ark-ui/react/radio-group'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { radioGroup } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(radioGroup)

export const Root = withProvider(styled(RadioGroup.Root), 'root')
export const Indicator = withContext(styled(RadioGroup.Indicator), 'indicator')
export const Item = withContext(styled(RadioGroup.Item), 'item')
export const ItemControl = withContext(styled(RadioGroup.ItemControl), 'itemControl')
export const ItemText = withContext(styled(RadioGroup.ItemText), 'itemText')
export const Label = withContext(styled(RadioGroup.Label), 'label')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface IndicatorProps extends ComponentProps<typeof Indicator> {}
export interface ItemProps extends ComponentProps<typeof Item> {}
export interface ItemControlProps extends ComponentProps<typeof ItemControl> {}
export interface ItemTextProps extends ComponentProps<typeof ItemText> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
