import type {
  HighlightChangeDetails as TagsInputHighlightChangeDetails,
  ValidityChangeDetails as TagsInputValidityChangeDetails,
  ValueChangeDetails as TagsInputValueChangeDetails,
} from '@zag-js/tags-input'
import { TagsInput as TagsInputRoot, type TagsInputProps } from './tags-input'
import { TagsInputClearTrigger, type TagsInputClearTriggerProps } from './tags-input-clear-trigger'
import { useTagsInputContext, type TagsInputContext } from './tags-input-context'
import { TagsInputControl, type TagsInputControlProps } from './tags-input-control'
import { TagsInputInput, type TagsInputInputProps } from './tags-input-input'
import { TagsInputItem, type TagsInputItemProps } from './tags-input-item'
import { useTagsInputItemContext, type TagsInputItemContext } from './tags-input-item-context'
import {
  TagsInputItemDeleteTrigger,
  type TagsInputItemDeleteTriggerProps,
} from './tags-input-item-delete-trigger'
import { TagsInputItemInput, type TagsInputItemInputProps } from './tags-input-item-input'
import { TagsInputItemText, type TagsInputItemTextProps } from './tags-input-item-text'
import { TagsInputLabel, type TagsInputLabelProps } from './tags-input-label'

const TagsInput = Object.assign(TagsInputRoot, {
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

export {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemText,
  TagsInputLabel,
  useTagsInputContext,
  useTagsInputItemContext,
}

export type {
  TagsInputClearTriggerProps,
  TagsInputContext,
  TagsInputControlProps,
  TagsInputHighlightChangeDetails,
  TagsInputInputProps,
  TagsInputItemContext,
  TagsInputItemDeleteTriggerProps,
  TagsInputItemInputProps,
  TagsInputItemProps,
  TagsInputItemTextProps,
  TagsInputLabelProps,
  TagsInputProps,
  TagsInputValidityChangeDetails,
  TagsInputValueChangeDetails,
}
