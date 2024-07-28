'use client'
import type { Assign } from '@ark-ui/react'
import { TagsInput } from '@ark-ui/react/tags-input'
import { type TagsInputVariantProps, tagsInput } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(tagsInput)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, TagsInput.RootProviderBaseProps>, TagsInputVariantProps>
>(TagsInput.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, TagsInput.RootBaseProps>, TagsInputVariantProps>
>(TagsInput.Root, 'root')

export const ClearTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, TagsInput.ClearTriggerBaseProps>
>(TagsInput.ClearTrigger, 'clearTrigger')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TagsInput.ControlBaseProps>
>(TagsInput.Control, 'control')

export const Input = withContext<
  HTMLInputElement,
  Assign<HTMLStyledProps<'input'>, TagsInput.InputBaseProps>
>(TagsInput.Input, 'input')

export const ItemDeleteTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, TagsInput.ItemDeleteTriggerBaseProps>
>(TagsInput.ItemDeleteTrigger, 'itemDeleteTrigger')

export const ItemInput = withContext<
  HTMLInputElement,
  Assign<HTMLStyledProps<'input'>, TagsInput.ItemInputBaseProps>
>(TagsInput.ItemInput, 'itemInput')

export const ItemPreview = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TagsInput.ItemPreviewBaseProps>
>(TagsInput.ItemPreview, 'itemPreview')

export const Item = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TagsInput.ItemBaseProps>
>(TagsInput.Item, 'item')

export const ItemText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, TagsInput.ItemTextBaseProps>
>(TagsInput.ItemText, 'itemText')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, TagsInput.LabelBaseProps>
>(TagsInput.Label, 'label')

export {
  TagsInputContext as Context,
  TagsInputHiddenInput as HiddenInput,
} from '@ark-ui/react/tags-input'
