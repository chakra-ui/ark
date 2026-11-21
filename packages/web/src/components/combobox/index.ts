import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/combobox'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type { ItemInput } from '../../utils/collection.js'

export type { Api as ComboboxApi } from '@zag-js/combobox'
export type ComboboxElement = RootElement<Api, Props> &
  FunctionProperties<Props> &
  Pick<Props, 'ids' | 'translations' | 'positioning'> & { items?: ItemInput[] }

declare global {
  interface HTMLElementTagNameMap {
    'ark-combobox': ComboboxElement
  }
}

export type ComboboxEventMap = CallbackEvents<Props>
