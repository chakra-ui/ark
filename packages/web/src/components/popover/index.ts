import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/popover'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as PopoverApi } from '@zag-js/popover'
export type PopoverElement = RootElement<Api, Props> &
  FunctionProperties<Props> &
  Pick<Props, 'ids' | 'translations' | 'positioning'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-popover': PopoverElement
  }
}

export type PopoverEventMap = CallbackEvents<Props>
