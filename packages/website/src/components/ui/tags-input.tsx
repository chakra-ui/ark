import * as Ark from '@ark-ui/react/src/tags-input'
import { styled } from 'styled-system/jsx'
import { tagsInput, type TagsInputVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(tagsInput)

export * from '@ark-ui/react/src/tags-input'
export type TagsInputProps = Ark.TagsInputProps & TagsInputVariantProps

const TagsInputRoot = withProvider(styled(Ark.TagsInput.Root), 'root')
export const TagsInputClearTrigger = withContext(styled(Ark.TagsInput.ClearTrigger), 'clearTrigger')
export const TagsInputControl = withContext(styled(Ark.TagsInput.Control), 'control')
export const TagsInputInput = withContext(styled(Ark.TagsInput.Input), 'input')
export const TagsInputLabel = withContext(styled(Ark.TagsInput.Label), 'label')
export const TagsInputItem = withContext(styled(Ark.TagsInput.Item), 'tag')
export const TagsInputItemInput = withContext(styled(Ark.TagsInput.ItemInput), 'tagInput')
export const TagsInputItemText = withContext(styled(Ark.TagsInput.ItemText))

export const TagsInputItemDeleteTrigger = withContext(
  styled(Ark.TagsInput.ItemDeleteTrigger),
  'tagDeleteTrigger',
)

export const TagsInput = Object.assign(TagsInputRoot, {
  Root: TagsInputRoot,
  ClearTrigger: TagsInputClearTrigger,
  Control: TagsInputControl,
  Input: TagsInputInput,
  Item: TagsInputItem,
  ItemDeleteTrigger: TagsInputItemDeleteTrigger,
  ItemInput: TagsInputItemInput,
  ItemText: TagsInputItemText,
  Label: TagsInputLabel,
})
