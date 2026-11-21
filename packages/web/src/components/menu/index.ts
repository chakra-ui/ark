import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/menu'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as MenuApi } from '@zag-js/menu'
export interface MenuElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'positioning'>,
    StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-menu': MenuElement
  }
}

export type MenuEventMap = CallbackEvents<Props>
