import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/tabs'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as TabsApi } from '@zag-js/tabs'
export type TabsElement = RootElement<Api, Props> & FunctionProperties<Props> & Pick<Props, 'ids' | 'translations'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-tabs': TabsElement
  }
}

export type TabsEventMap = CallbackEvents<Props>
