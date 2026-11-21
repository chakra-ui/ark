import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/tags-input'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type {
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputLabel,
} from './parts.js'

export type { Api as TagsInputApi } from '@zag-js/tags-input'
export interface TagsInputElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'translations' | 'delimiter'>,
    StateProperties<Props, 'value' | 'inputValue'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-tags-input': TagsInputElement
    'ark-tags-input-control': InstanceType<typeof TagsInputControl>
    'ark-tags-input-input': InstanceType<typeof TagsInputInput>
    'ark-tags-input-clear-trigger': InstanceType<typeof TagsInputClearTrigger>
    'ark-tags-input-hidden-input': InstanceType<typeof TagsInputHiddenInput>
    'ark-tags-input-item': InstanceType<typeof TagsInputItem>
    'ark-tags-input-item-preview': InstanceType<typeof TagsInputItemPreview>
    'ark-tags-input-item-text': InstanceType<typeof TagsInputItemText>
    'ark-tags-input-item-input': InstanceType<typeof TagsInputItemInput>
    'ark-tags-input-item-delete-trigger': InstanceType<typeof TagsInputItemDeleteTrigger>
    'ark-tags-input-label': InstanceType<typeof TagsInputLabel>
  }
}

export type TagsInputEventMap = CallbackEvents<Props>
