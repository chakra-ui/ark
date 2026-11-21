import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/listbox'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type { ItemInput } from '../../utils/collection.js'

export type { Api as ListboxApi } from '@zag-js/listbox'
export type ListboxElement = RootElement<Api, Props> &
  FunctionProperties<Props> &
  Pick<Props, 'ids'> & { items?: ItemInput[] }

declare global {
  interface HTMLElementTagNameMap {
    'ark-listbox': ListboxElement
  }
}

export type ListboxEventMap = CallbackEvents<Props>
