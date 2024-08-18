'use client'
import type { Assign } from '@ark-ui/react'
import { Checkbox } from '@ark-ui/react/checkbox'
import { type CheckboxVariantProps, checkbox } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(checkbox)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLLabelElement,
  Assign<Assign<HTMLStyledProps<'label'>, Checkbox.RootProviderBaseProps>, CheckboxVariantProps>
>(Checkbox.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLLabelElement,
  Assign<Assign<HTMLStyledProps<'label'>, Checkbox.RootBaseProps>, CheckboxVariantProps>
>(Checkbox.Root, 'root')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Checkbox.ControlBaseProps>
>(Checkbox.Control, 'control')

export const Group = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Checkbox.GroupBaseProps>
>(Checkbox.Group, 'group')

export const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, Checkbox.IndicatorBaseProps>
>(Checkbox.Indicator, 'indicator')

export const Label = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Checkbox.LabelBaseProps>
>(Checkbox.Label, 'label')

export {
  CheckboxContext as Context,
  CheckboxHiddenInput as HiddenInput,
} from '@ark-ui/react/checkbox'
