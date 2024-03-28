import { TagsInput } from '@ark-ui/react/src/tags-input'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { tagsInput } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(tagsInput)

export const Root = withProvider(styled(TagsInput.Root), 'root')
export const ClearTrigger = withContext(styled(TagsInput.ClearTrigger), 'clearTrigger')
export const Control = withContext(styled(TagsInput.Control), 'control')
export const Input = withContext(styled(TagsInput.Input), 'input')
export const Item = withContext(styled(TagsInput.Item), 'item')
export const ItemDeleteTrigger = withContext(
  styled(TagsInput.ItemDeleteTrigger),
  'itemDeleteTrigger',
)
export const ItemInput = withContext(styled(TagsInput.ItemInput), 'itemInput')
export const ItemPreview = withContext(styled(TagsInput.ItemPreview), 'itemPreview')
export const ItemText = withContext(styled(TagsInput.ItemText), 'itemText')
export const Label = withContext(styled(TagsInput.Label), 'label')
export const Context = TagsInput.Context

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ClearTriggerProps extends ComponentProps<typeof ClearTrigger> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface InputProps extends ComponentProps<typeof Input> {}
export interface ItemProps extends ComponentProps<typeof Item> {}
export interface ItemDeleteTriggerProps extends ComponentProps<typeof ItemDeleteTrigger> {}
export interface ItemInputProps extends ComponentProps<typeof ItemInput> {}
export interface ItemPreviewProps extends ComponentProps<typeof ItemPreview> {}
export interface ItemTextProps extends ComponentProps<typeof ItemText> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
