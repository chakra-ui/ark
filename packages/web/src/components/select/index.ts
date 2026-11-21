import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/select'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type { ItemInput } from '../../utils/collection.js'

export type { Api as SelectApi } from '@zag-js/select'
export type SelectElement = RootElement<Api, Props> &
  FunctionProperties<Props> &
  Pick<Props, 'ids' | 'translations' | 'positioning'> & { items?: ItemInput[] }

declare global {
  interface HTMLElementTagNameMap {
    'ark-select': SelectElement
  }
}

export type SelectEventMap = CallbackEvents<Props>
