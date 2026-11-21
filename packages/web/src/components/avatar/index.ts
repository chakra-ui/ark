import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/avatar'
import type { RootElement } from '../../utils/define.js'

export type {
  Api as AvatarApi,
  LoadStatus as AvatarLoadStatus,
  StatusChangeDetails as AvatarStatusChangeDetails,
} from '@zag-js/avatar'
export interface AvatarElement extends RootElement<Api, Props>, Pick<Props, 'ids'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-avatar': AvatarElement
  }
}

export type AvatarEventMap = CallbackEvents<Props>
