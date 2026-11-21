import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/tags-input'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as TagsInputApi } from '@zag-js/tags-input'
export type TagsInputElement = RootElement<Api, Props> &
  FunctionProperties<Props> &
  Pick<Props, 'ids' | 'translations' | 'delimiter'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-tags-input': TagsInputElement
  }
}

export type TagsInputEventMap = CallbackEvents<Props>
