import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/toggle'
import type { RootElement } from '../../utils/define.js'

export type { Api as ToggleApi } from '@zag-js/toggle'
export type ToggleElement = RootElement<Api, Props>

declare global {
  interface HTMLElementTagNameMap {
    'ark-toggle': ToggleElement
  }
}

export type ToggleEventMap = CallbackEvents<Props>
