'use client'
import type { Assign } from '@ark-ui/react'
import { Switch } from '@ark-ui/react/switch'
import { type SwitchRecipeVariantProps, switchRecipe } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(switchRecipe)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLLabelElement,
  Assign<Assign<HTMLStyledProps<'label'>, Switch.RootProviderBaseProps>, SwitchRecipeVariantProps>
>(Switch.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLLabelElement,
  Assign<Assign<HTMLStyledProps<'label'>, Switch.RootBaseProps>, SwitchRecipeVariantProps>
>(Switch.Root, 'root')

export const Control = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Switch.ControlBaseProps>
>(Switch.Control, 'control')

export const Label = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Switch.LabelBaseProps>
>(Switch.Label, 'label')

export const Thumb = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, Switch.ThumbBaseProps>
>(Switch.Thumb, 'thumb')

export {
  SwitchContext as Context,
  SwitchHiddenInput as HiddenInput,
} from '@ark-ui/react/switch'
