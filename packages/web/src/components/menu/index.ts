import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/menu'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as MenuApi } from '@zag-js/menu'
export type MenuElement = RootElement<Api, Props> & FunctionProperties<Props> & Pick<Props, 'ids' | 'positioning'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-menu': MenuElement
  }
}

export type MenuEventMap = CallbackEvents<Props>
