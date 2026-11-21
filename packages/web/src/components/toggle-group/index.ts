import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/toggle-group'
import type { RootElement } from '../../utils/define.js'

export type { Api as ToggleGroupApi } from '@zag-js/toggle-group'
export type ToggleGroupElement = RootElement<Api, Props> & Pick<Props, 'ids'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-toggle-group': ToggleGroupElement
  }
}

export type ToggleGroupEventMap = CallbackEvents<Props>
