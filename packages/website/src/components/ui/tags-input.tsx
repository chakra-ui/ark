import * as Ark from '@ark-ui/react/tags-input'
import { styled } from 'styled-system/jsx'
import { tagsInput, type TagsInputVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(tagsInput)

export * from '@ark-ui/react/tags-input'
export type TagsInputProps = Ark.TagsInputProps & TagsInputVariantProps

const TagsInputRoot = withProvider(styled(Ark.TagsInput.Root), 'root')
export const TagsInputClearTrigger = withContext(styled(Ark.TagsInput.ClearTrigger), 'clearTrigger')
export const TagsInputControl = withContext(styled(Ark.TagsInput.Control), 'control')
export const TagsInputInput = withContext(styled(Ark.TagsInput.Input), 'input')
export const TagsInputLabel = withContext(styled(Ark.TagsInput.Label), 'label')
export const Tag = withContext(styled(Ark.TagsInput.Tag), 'tag')
export const TagInput = withContext(styled(Ark.TagsInput.TagInput), 'tagInput')
export const TagDeleteTrigger = withContext(
  styled(Ark.TagsInput.TagDeleteTrigger),
  'tagDeleteTrigger',
)

export const TagsInput = Object.assign(TagsInputRoot, {
  Root: TagsInputRoot,
  ClearTrigger: TagsInputClearTrigger,
  Control: TagsInputControl,
  Input: TagsInputInput,
  Label: TagsInputLabel,
  Tag: Tag,
  TagInput: TagInput,
  TagDeleteTrigger: TagDeleteTrigger,
})
